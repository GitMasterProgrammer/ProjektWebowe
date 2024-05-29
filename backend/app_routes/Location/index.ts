import { PrismaClient } from '@prisma/client';
import { Express, Request, Response, Router } from 'express';
import { unsetKeys } from '../../functions/unsetKeys';
import { convertToInt } from '../../functions/convertToInt';
import CustomRequest from '../../interfaces/customReq';

const prisma = new PrismaClient();

const router = Router();

router.get('/get', async (req: CustomRequest, res: Response) => {
    try {
        const ord = JSON.parse(JSON.stringify(req.convertedQuery))
        const where = unsetKeys(req.convertedQuery, ['maxRows', 'orderBy', 'lastHrs']);
        const maxRows = ord.maxRows ? ord.maxRows : undefined;
        const lastHrs = ord.lastHrs ? parseInt(ord.lastHrs, 10) : undefined;


        let orderBy: any = {};

        if (where.actual === false) {
            delete where.actual;
        }

        if (ord.orderBy) {
            const [orderField, orderDirection] = ord.orderBy.split('_'); 
            orderBy[orderField] = orderDirection.toLowerCase();
        }

        const take = maxRows ? parseInt(maxRows, 10) : undefined;

        if (lastHrs) {
            const currentTime = new Date();
            const pastTime = new Date(currentTime.getTime() - lastHrs * 60 * 60 * 1000);
            where.createdAt = {
                gte: pastTime
            };
        }

        const record = await prisma.location.findMany({ where, orderBy: orderBy, take, include: {creator: true, target: true} });

        res.json({
            record
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
    }
});

router.get('/get/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        
        const record = await prisma.location.findUnique({ where: { id: numericId }, include : {target:true, creator: true} });

        res.json({
            record
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});

router.post('/post', async (req : Request, res: Response) => {
    try {
        const data = req.body;

        const record = await prisma.location.create({ data });

        res.json({
            status: "success",
            data: record
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status:'failed', error: (error as Error).message });
    }
});

router.delete('/delete', async (req: Request, res: Response) => {
    try {
        const where = convertToInt(JSON.parse(JSON.stringify(req.query))) 

        const record = await prisma.location.deleteMany({ where });

        res.json({
            record
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


router.put('/put/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const record = await prisma.location.update({ where: { id: numericId }, data });


        res.json({
            record
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export { router as router_location };
