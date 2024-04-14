import express, { Express, Request, Response, Router } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router : Router = express.Router();

type PrismaModel = 'user'; 

router.post('/:table', async (req : Request, res : Response) => {
    try {
        const { table } = req.params;
        const records = await prisma[table as PrismaModel].findMany();
        res.json(records);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
    }
})

export {router as router_put};