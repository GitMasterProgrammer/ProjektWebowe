import { PrismaClient } from '@prisma/client';
import { Express, Request, Response, Router } from 'express';
const prisma = new PrismaClient();

const router = Router();

type TableName = 'user' | 'target' | 'location'; 

router.delete('/:table', async (req: Request, res: Response) => {
    try {
        const { table } = req.params;
        const where = req.body.where;

        let record; // kiedys zmienie tego leta
        switch (table) {
            case 'user':
                record = await prisma.user.deleteMany({ where });
                break;
            case 'target':
                record = await prisma.target.deleteMany({ where });
                break;
            case 'location':
                record = await prisma.location.deleteMany({ where });
                break;
            case 'targetsOnUsers':
                record = await prisma.targetsOnUsers.deleteMany({ where });
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

export { router as router_delete };
