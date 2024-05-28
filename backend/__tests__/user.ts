

// const server = require('../index');

// const requestWithSupertest = supertest(server);
import supertest from "supertest";
import createServer from "../functions/server";
import {PrismaClient} from "@prisma/client";

const app = createServer()
const prisma = new PrismaClient();

beforeAll(async ()=> {
    const data = {
            id: 999999,
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '$2a$10$CwTycUXWue0Thq9StjUM0uBroupzYajcgoPfzad9vhEzOHEIAa3Cy'
        }

    const newUser = await prisma.user.create({ data });

})

afterAll(async ()=> {
    await prisma.user.deleteMany({where:{
        id: 999999
    }});
})

describe('User Tests', () => {
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


});