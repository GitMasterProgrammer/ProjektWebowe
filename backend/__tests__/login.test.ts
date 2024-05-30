

// const server = require('../index');

// const requestWithSupertest = supertest(server);
import supertest from "supertest";
import createServer from "../functions/server";
import {PrismaClient} from "@prisma/client";
import {sample_user, sample_user2, sample_user7, sample_user8} from "./samples";

const app = createServer()
const prisma = new PrismaClient();

beforeAll(async ()=> {
    const newUser = await prisma.user.create({ data: sample_user8 });
})

afterAll(async ()=> {
    await prisma.user.deleteMany({where:{
            id: 999992
        }});
})

describe('Login Tests', () => {
    it('Correct login', async ()=> {
        const res  = await supertest(app).post('/api/login/')
            .send({
                email: sample_user8.email,
                password: sample_user8.password,
            })
            .set('Content-Type', 'application/json')
            .expect(200)
        expect(res.body.token).toBeDefined()
        expect(res.body.id).toBe(sample_user8.id)
    })
    it('Wrong password', async ()=> {
        const res  = await supertest(app).post('/api/login/')
            .send({
                email: sample_user8.email,
                password: 'passs',
            })
            .set('Content-Type', 'application/json')
            .expect(400)
    })
    it('Wrong email', async ()=> {
        const res  = await supertest(app).post('/api/login/')
            .send({
                email: 'email',
                password: sample_user8.password,
            })
            .set('Content-Type', 'application/json')
            .expect(400)
    })


});