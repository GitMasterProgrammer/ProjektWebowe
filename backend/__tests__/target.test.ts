

// const server = require('../index');

// const requestWithSupertest = supertest(server);
import supertest from "supertest";
import createServer from "../functions/server";
import {PrismaClient} from "@prisma/client";
import {sample_target, sample_target2, sample_user3} from "./samples";

const app = createServer()
const prisma = new PrismaClient();

beforeAll(async ()=> {
    const newUser = await prisma.user.create({ data: sample_user3 });
    const newTarget = await prisma.target.create({ data: sample_target });
})

afterAll(async ()=> {

    await prisma.target.deleteMany({where:{
            id: 999999
        }});
    await prisma.target.deleteMany({where:{
            id: 999998
        }});
    await prisma.user.deleteMany({where:{
            id: 999997
        }});
})

describe('Target Tests', () => {
    describe('Get by id ', ()=> {
        it('Wrong id returns 400', async () => {
            await supertest(app).get('/api/target/get/id').expect(400)
        });
        it('Correct id', async () => {
            const res  = await supertest(app).get('/api/target/get/999999').expect(200)
            expect(res.body.target.id).toBe(999999)
            expect(res.body.target.description).toBe('DEscription')
        });
    })
    describe('Get all',   ()=> {
        it('Get all', async ()=> {
            const res  = await supertest(app).get('/api/target/get/')
            expect(res.body.recordsLike.length).toBeGreaterThanOrEqual(1)
        })
        it('Get all with order by', async ()=> {
            const res  = await supertest(app).get('/api/target/get/?orderBy=id_desc')
            expect(res.body.recordsLike[0].id).toBe(999999)
        })
        it('Get all with name', async ()=> {
            const res  = await supertest(app).get('/api/target/get/?name=$2a$10$CwTycUXWue0Thq9StjUM0uBroupzYajcgoPfzad9vhEzOHEIAa3Cy')
            expect(res.body.recordsLike[0].id).toBe(999999)
        })
    })
    describe('Post',   ()=> {
        it('Correct Post', async ()=> {
            await supertest(app).post('/api/target/post/')
                .send(sample_target2)
                .set('Content-Type', 'application/json')
                .expect(200)
        })
        it('Wrong body', async ()=> {
            await supertest(app).post('/api/target/post/')
                .send({'xd': '2137'})
                .set('Content-Type', 'application/json')
                .expect(500)
        })
    })
    describe('Delete',   ()=> {
        it('Correct delete', async ()=> {
            const res  = await supertest(app).delete('/api/target/delete/?id=999998').expect(200)
        })
        it('Wrong query', async ()=> {
            const res  = await supertest(app).delete('/api/target/delete/?id=xd').expect(500)
        })
    })
    describe('Put',   ()=> {
        it('Correct Put', async ()=> {
            await supertest(app).put('/api/target/put/999999')
                .send({
                    name: 'John John',
                })
                .set('Content-Type', 'application/json')
                .expect(200)
        })
        it('PRIMARY exeption', async ()=> {
            await supertest(app).put('/api/target/put/999999')
                .send({
                    id: 'John John',
                })
                .set('Content-Type', 'application/json')
                .expect(500)
        })
        it('Wrong ID', async ()=> {
            await supertest(app).put('/api/target/put/xd')
                .send({
                    name: 'John John',
                })
                .set('Content-Type', 'application/json')
                .expect(400)
        })
    })

});