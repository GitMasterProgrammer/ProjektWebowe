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
        const where = unsetKeys(req.convertedQuery, ['maxRows', 'orderBy']);
        const maxRows = ord.maxRows ? ord.maxRows : undefined;

        let orderBy: any = {};

        if (where.actual === false) {
            delete where.actual;
        }

        if (ord.orderBy) {
            const [orderField, orderDirection] = ord.orderBy.split('_'); 
            orderBy[orderField] = orderDirection.toLowerCase();
        }

        const take = maxRows ? parseInt(maxRows, 10) : undefined;

        const record = await prisma.locationsOnUsers.findMany({ where, orderBy: orderBy, take, include : { location : true, user: true }});

        res.json({
            record
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
    }
});


router.post('/post', async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const record = await prisma.locationsOnUsers.create({ data });

        const { locationId } = data;

        const ratings = await prisma.locationsOnUsers.findMany({
            where: {
                locationId: locationId,
            },
            select: {
                value: true,
            },
        });

        const averageRating = ratings.reduce((acc, curr) => acc + curr.value, 0) / ratings.length;

        await prisma.location.update({
            where: {
                id: locationId,
            },
            data: {
                rating: averageRating,
            },
        });

        res.json({
            status: "success",
            data: record,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'failed', error: (error as Error).message });
    }
});

router.delete('/delete', async (req: Request, res: Response) => {
    try {
        const where = convertToInt(JSON.parse(JSON.stringify(req.query))) 

        const record = await prisma.locationsOnUsers.deleteMany({ where });

        res.json({
            record
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


router.put('/put', async (req: CustomRequest, res: Response) => {
    try {
        const { userId, locationId, value } = req.body;

        if (!userId || !locationId || value === undefined) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        const rating = await prisma.locationsOnUsers.upsert({
            where: {
                userId_locationId: {
                    userId: userId,
                    locationId: locationId,
                },
            },
            update: {
                value: value,
                likedAt: new Date(),
            },
            create: {
                userId: userId,
                locationId: locationId,
                value: value,
                likedAt: new Date(),
            },
        });

        const ratings = await prisma.locationsOnUsers.findMany({
            where: {
                locationId: locationId,
            },
            select: {
                value: true,
            },
        });

        const averageRating =
            ratings.reduce((acc, curr) => acc + curr.value, 0) / ratings.length;

        await prisma.location.update({
            where: {
                id: locationId,
            },
            data: {
                rating: averageRating,
            },
        });

        res.json({ success: true, rating });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export { router as router_liked_locations };
