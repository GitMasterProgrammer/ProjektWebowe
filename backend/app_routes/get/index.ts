import { PrismaClient } from '@prisma/client';
import { Express, Request, Response, Router } from 'express';
const prisma = new PrismaClient();

const router = Router();

router.get('/user', async (req : Request, res: Response) => {
    try {
        const { table } = req.params;
        const where = req.body;
        
        if (Object.keys(where).length === 0) {
            const record = await prisma.user.findMany();

            res.json({
                record
            });
        } else {
            // Jeśli obiekt where zawiera kryteria wyszukiwania, zwracamy tylko te rekordy
            const record = await prisma.user.findMany({
                where,
            });
            res.json({
                record
            });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export {router as router_get};
