import { Express, Request, Response, Router } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router : Router = Router();


router.get('/user', async (req : Request, res : Response) => {
    try {
        const records = await prisma.user.findMany();
        res.json(records);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "sam se napraw"});
    }
})

export {router as router_put};