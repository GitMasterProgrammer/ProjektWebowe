

// const server = require('../index');

// const requestWithSupertest = supertest(server);
import supertest from "supertest";
import createServer from "../functions/server";
import {PrismaClient} from "@prisma/client";
import {sample_location, sample_location2, sample_target3, sample_user4} from "./samples";

const app = createServer()
const prisma = new PrismaClient();

beforeAll(async () => {
    const newUser = await prisma.user.create({ data: sample_user4 });
    const newTarget = await prisma.target.create({ data: sample_target3 });
    const newLocation = await prisma.location.create({ data: sample_location });
})

afterAll(async ()=> {

    await prisma.location.deleteMany({where:{
            id: sample_location.id
        }});
    await prisma.target.deleteMany({where:{
            id: 999997
        }});
    await prisma.user.deleteMany({where:{
            id: sample_user4.id
        }});

})

describe('User Tests', () => {
    describe('Get by id ', ()=> {
        it('Wrong id returns 400', async () => {
            await supertest(app).get('/api/location/get/id').expect(400)
        });
        it('Correct id', async () => {
            const res  = await supertest(app).get('/api/location/get/999999')
            expect(res.body.record.id).toBe(999999)
            expect(res.body.record.address).toBe('Poznan')
        });
    })
    describe('Get all',   ()=> {
        it('Get all', async ()=> {
            const res  = await supertest(app).get('/api/location/get/')
            expect(res.body.record.length).toBeGreaterThanOrEqual(1)
        })
        it('Get all with order by', async ()=> {
            const res  = await supertest(app).get('/api/location/get/?orderBy=id_desc')
            expect(res.body.record[0].id).toBe(999999)
        })
    })
    describe('Post',   ()=> {
        it('Correct Post', async ()=> {
            await supertest(app).post('/api/location/post/')
                .send(sample_location2)
                .set('Content-Type', 'application/json')
                .expect(200)
        })
        it('Wrong body', async ()=> {
            await supertest(app).post('/api/location/post/')
                .send({'xd': '2137'})
                .set('Content-Type', 'application/json')
                .expect(500)
        })
    })
    describe('Delete',   ()=> {
        it('Correct delete', async ()=> {
            const res  = await supertest(app).delete('/api/location/delete/?id=999998').expect(200)
        })
        it('Wrong query', async ()=> {
            const res  = await supertest(app).delete('/api/location/delete/?id=xd').expect(500)
        })
    })
    describe('Put',   ()=> {
        it('Correct Put', async ()=> {
            await supertest(app).put('/api/location/put/999999')
                .send({
                    details: 'John John',
                })
                .set('Content-Type', 'application/json')
                .expect(200)
        })
        it('PRIMARY exeption', async ()=> {
            await supertest(app).put('/api/location/put/999999')
                .send({
                    id: 'John John',
                })
                .set('Content-Type', 'application/json')
                .expect(500)
        })
        it('Wrong ID', async ()=> {
            await supertest(app).put('/api/location/put/xd')
                .send({
                    name: 'John John',
                })
                .set('Content-Type', 'application/json')
                .expect(400)
        })
    })

});