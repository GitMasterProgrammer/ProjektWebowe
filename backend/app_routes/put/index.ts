import { PrismaClient } from '@prisma/client';
import { Express, Request, Response, Router } from 'express';
const prisma = new PrismaClient();

const router = Router();

type TableName = 'user' | 'target' | 'location'; 

router.put('/:table', async (req: Request, res: Response) => {
    try {
        const { table } = req.params;
        const where = req.body.where;
        const data = req.body.data;

        let record; // kiedys zmienie tego leta
        switch (table) {
            case 'user':
                record = await prisma.user.updateMany({ where, data });
                break;
            case 'target':
                record = await prisma.target.updateMany({ where, data });
                break;
            case 'location':
                record = await prisma.location.updateMany({ where, data });
                break;
            default:
                return res.status(400).json({ error: 'Invalid table name' });
        }

        res.json({
            record
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export { router as router_put };
