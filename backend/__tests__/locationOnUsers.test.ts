

// const server = require('../index');

// const requestWithSupertest = supertest(server);
import supertest from "supertest";
import createServer from "../functions/server";
import {PrismaClient} from "@prisma/client";
import {
    sample_location3, sample_locationOnUser, sample_locationOnUser2,
    sample_target3,
    sample_target6,
    sample_user4,
    sample_user6,
    sample_user7
} from "./samples";

const app = createServer()
const prisma = new PrismaClient();

beforeAll(async () => {
    await prisma.user.create({ data: sample_user6 });
    await prisma.user.create({ data: sample_user7 });
    await prisma.target.create({ data: sample_target6 });
    await prisma.location.create({ data: sample_location3 });
    await prisma.locationsOnUsers.create({data: sample_locationOnUser});
})

afterAll(async ()=> {

    await prisma.locationsOnUsers.deleteMany({
        where: {
            userId: 999994,
            locationId: 999997,
        },
    });
    await prisma.location.deleteMany({where:{
            id: sample_location3.id
        }});
    await prisma.target.deleteMany({where:{
            id: sample_target6.id
        }});
    await prisma.user.deleteMany({where:{
            id: sample_user6.id
        }});
    await prisma.user.deleteMany({where:{
            id: sample_user7.id
        }});

})

describe('Location on users Tests', () => {
    describe('Get all',   ()=> {
        it('Get all', async ()=> {
            const res  = await supertest(app).get('/api/likedLocations/get/')
            expect(res.body.record.length).toBeGreaterThanOrEqual(1)
        })
        it('Get all with where', async ()=> {
            const res  = await supertest(app).get('/api/likedLocations/get?locationId=999997&userId=999994')
            expect(res.body.record[0].userId).toBe(999994)
            expect(res.body.record[0].locationId).toBe(999997)
        })
        it('Get all with order by', async ()=> {
            const res  = await supertest(app).get('/api/likedLocations/get?orderBy=userId_desc')
            expect(res.body.record[0].userId).toBe(999994)
            expect(res.body.record[0].locationId).toBe(999997)
        })
    })
    describe('Post',   ()=> {
        it('Correct Post', async ()=> {
            await supertest(app).post('/api/likedLocations/post/')
                .send(sample_locationOnUser2)
                .set('Content-Type', 'application/json')
                .expect(200)
        })
        it('Wrong body', async ()=> {
            await supertest(app).post('/api/likedLocations/post/')
                .send({'xd': '2137'})
                .set('Content-Type', 'application/json')
                .expect(500)
        })
    })
    describe('Delete',   ()=> {
        it('Correct delete', async ()=> {
            const res  = await supertest(app).delete('/api/likedLocations/delete?userId=999993&locationId=999997').expect(200)
        })
        it('Wrong query', async ()=> {
            const res  = await supertest(app).delete('/api/likedLocations/delete?id=xd').expect(500)
        })
    })
    describe('Put',   ()=> {
        it('Correct Put', async ()=> {
            await supertest(app).put('/api/likedLocations/put/')
                .send({
                    value: 2,
                    userId: 999994,
                    locationId: 999997
                })
                .set('Content-Type', 'application/json')
                .expect(200)
        })
        it('Wrong ID', async ()=> {
            await supertest(app).put('/api/likedLocations/put/')
                .send({
                    value: 2,
                    userId: 999994,
                    locationId: 'xd'
                })
                .set('Content-Type', 'application/json')
                .expect(500)
        })
        it('No ID', async ()=> {
            await supertest(app).put('/api/likedLocations/put/')
                .send({
                    value: 2,
                    userId: 999994,
                })
                .set('Content-Type', 'application/json')
                .expect(400)
        })
    })

});