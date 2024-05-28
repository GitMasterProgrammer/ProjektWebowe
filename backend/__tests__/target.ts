

// const server = require('../index');

// const requestWithSupertest = supertest(server);
import supertest from "supertest";
import createServer from "../functions/server";
import {PrismaClient} from "@prisma/client";

const app = createServer()
const prisma = new PrismaClient();
const sample_user = {
    id: 999999,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: '$2a$10$CwTycUXWue0Thq9StjUM0uBroupzYajcgoPfzad9vhEzOHEIAa3Cy',
    reliability: 99999
}
const sample_target = {
    id: 999998,
    name: 'John Doe2',
    description: 'DEscription',
    creatorId: 999999,
}
beforeAll(async ()=> {
    const newUser = await prisma.user.create({ data: sample_user });
    const newTarget = await prisma.target.create({ data: sample_target });
})

afterAll(async ()=> {
    await prisma.user.deleteMany({where:{
            id: 999999
        }});
    await prisma.target.deleteMany({where:{
            id: 999999
        }});
})

describe('Target Tests', () => {
    describe('Get by id ', ()=> {
        it('No user returns 404', async () => {
            await supertest(app).get('/api/user/get/-1').expect(404)
        });
        it('Wrong id returns 400', async () => {
            await supertest(app).get('/api/user/get/id').expect(400)
        });
        it('Correct id', async () => {
            const res  = await supertest(app).get('/api/user/get/999999')
            expect(res.body.user.id).toBe(999999)
            expect(res.body.user.name).toBe('John Doe')
        });
    })
    describe('Get all',   ()=> {
        it('Get all', async ()=> {
            const res  = await supertest(app).get('/api/user/get/')
            expect(res.body.record.length).toBeGreaterThanOrEqual(1)
        })
        it('Get all with order by', async ()=> {
            const res  = await supertest(app).get('/api/user/get/?orderBy=reliability_desc')
            expect(res.body.record[0].id).toBe(999999)
        })
    })
    describe('Post',   ()=> {
        it('Correct Post', async ()=> {
            await supertest(app).post('/api/user/post/')
                .send(sample_user2)
                .set('Content-Type', 'application/json')
                .expect(200)
        })
        it('Used email', async ()=> {
            sample_user2.email = 'johndoe@gmail.com'
            await supertest(app).post('/api/user/post/')
                .send(sample_user2)
                .set('Content-Type', 'application/json')
                .expect(400)
        })
        it('Wrong body', async ()=> {
            sample_user2.email = 'johndoe@gmail.com'
            await supertest(app).post('/api/user/post/')
                .send({'xd': '2137'})
                .set('Content-Type', 'application/json')
                .expect(500)
        })
    })
    describe('Delete',   ()=> {
        it('Correct delete', async ()=> {
            const res  = await supertest(app).delete('/api/user/delete/?id=999998').expect(200)
        })
        it('Wrong query', async ()=> {
            const res  = await supertest(app).delete('/api/user/delete/?id=xd').expect(500)
        })
    })
    describe('Put',   ()=> {
        it('Correct Put', async ()=> {
            await supertest(app).put('/api/user/put/999999')
                .send({
                    name: 'John John',
                })
                .set('Content-Type', 'application/json')
                .expect(200)
        })
        it('PRIMARY exeption', async ()=> {
            sample_user2.email = 'johndoe@gmail.com'
            await supertest(app).put('/api/user/put/999999')
                .send({
                    email: 'John John',
                })
                .set('Content-Type', 'application/json')
                .expect(500)
        })
        it('Wrong ID', async ()=> {
            sample_user2.email = 'johndoe@gmail.com'
            await supertest(app).put('/api/user/put/xd')
                .send({
                    name: 'John John',
                })
                .set('Content-Type', 'application/json')
                .expect(400)
        })
    })

});