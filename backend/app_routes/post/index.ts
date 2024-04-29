import { PrismaClient } from '@prisma/client';
import { Express, Request, Response, Router } from 'express';

const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const router = Router();

router.post('/:table', async (req : Request, res: Response) => {
    try {
        const data = req.body;
        const { table } = req.params;
        // const saltRounds = 10;
        //TODO: sprawdzanie, czy email jest użyty w bazie i zwracanie informacji

        let record; // kiedys zmienie tego leta
        switch (table) {
            case 'user':
                // data.password = await bcrypt.hash(data.password, saltRounds);
                record = await prisma.user.create({ data });
                break;
            case 'target':
                record = await prisma.target.create({ data });
                break;
            case 'location':
                record = await prisma.location.create({ data });
                break;
            case 'targetsOnUsers':
                record = await prisma.targetsOnUsers.create({ data });
                break;
            
            default:
                return res.status(400).json({ error: 'Invalid table name' });
        }

        res.json({
            status: "success",
            data: record
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status:'failed', error: (error as Error).message });
    }
});

export {router as router_post};