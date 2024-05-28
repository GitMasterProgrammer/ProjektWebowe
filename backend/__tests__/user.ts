

// const server = require('../index');

// const requestWithSupertest = supertest(server);
import supertest from "supertest";
import createServer from "../functions/server";

const app = createServer()

describe('User Tests', () => {
    describe('Get tests', ()=> {
        it('No user returns 404', async () => {

            await supertest(app).get('/api/users/get/:-1').expect(404)
        });
        it('Wrong id returns 404', async () => {

            await supertest(app).get('/api/users/get/id').expect(404)
        });
    })


});