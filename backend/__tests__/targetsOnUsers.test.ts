import supertest from "supertest";
import {
    sample_location,
    sample_location2,
    sample_target4,
    sample_target5, sample_targetOnUser, sample_targetOnUser2,
    sample_user4, sample_user5
} from "./samples";
import {PrismaClient} from "@prisma/client";
import createServer from "../functions/server";
const prisma = new PrismaClient();
const app = createServer()

beforeAll(async () => {
    const newUser = await prisma.user.create({ data: sample_user5 });
    const newTarget = await prisma.target.create({ data: sample_target4 });
    const newTarget2 = await prisma.target.create({ data: sample_target5 });
    const newTargetOnUser = await prisma.targetsOnUsers.create({ data: sample_targetOnUser });
})

afterAll(async ()=> {
     await prisma.targetsOnUsers.delete({
        where: {
            userId_targetId: {
                userId: sample_targetOnUser.userId,
                targetId: sample_targetOnUser.targetId,
            },
        },
    });
    // await prisma.targetsOnUsers.delete({
    //     where: {
    //         userId_targetId: {
    //             userId: sample_targetOnUser2.userId,
    //             targetId: sample_targetOnUser2.targetId,
    //         },
    //     },
    // });
    await prisma.target.deleteMany({where:{
            id: sample_target5.id
        }});
    await prisma.target.deleteMany({where:{
            id: sample_target4.id
        }});
    await prisma.user.deleteMany({where:{
            id: sample_user5.id
        }});
})
describe('Targets on users',   ()=> {
    it('Correct Post', async ()=> {
        await supertest(app).post('/api/favourites/')
            .send(sample_targetOnUser2)
            .set('Content-Type', 'application/json')
            .expect(200)
    })
    it('Missing data', async ()=> {
        await supertest(app).post('/api/favourites/')
            .send({'userId': 999995})
            .set('Content-Type', 'application/json')
            .expect(400)
    })
    it('Wrong body', async ()=> {
        await supertest(app).post('/api/favourites/')
            .send({'xd': '2137'})
            .set('Content-Type', 'application/json')
            .expect(400)
    })
})
describe('Delete',   ()=> {
    it('Correct delete', async ()=> {
        const res  = await supertest(app).delete('/api/favourites/?targetId=999995&userId=999995').expect(200)
    })
    it('Wrong query', async ()=> {
        const res  = await supertest(app).delete('/api/favourites/?id=xd').expect(400)
    })
    it('Missing data', async ()=> {
        await supertest(app).delete('/api/favourites/')
            .send({'userId': 999995})
            .set('Content-Type', 'application/json')
            .expect(400)
    })
})