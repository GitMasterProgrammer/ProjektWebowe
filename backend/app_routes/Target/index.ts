import { PrismaClient } from '@prisma/client';
import { Express, Request, Response, Router } from 'express';
import { unsetKeys } from '../../functions/unsetKeys';
import { convertToInt } from '../../functions/convertToInt';

const prisma = new PrismaClient();

const router = Router();


router.get('/get', async (req: Request, res: Response) => {
    try {
        const ord = JSON.parse(JSON.stringify(req.query))
        const where = unsetKeys(convertToInt(JSON.parse(JSON.stringify(req.query))), ['maxRows', 'orderBy']) 

        const maxRows = ord.maxRows ? ord.maxRows : undefined;
        // TODO: wyszukiwanie po części name (np wpisuje Pys i wypisuje Pyssa, Pyssator) Teraz sprawdza czy name jest rowne
        //TODO: to samo zrób też dla location
        let orderBy: any = {};

        if (ord.orderBy) {
            const [orderField, orderDirection] = ord.orderBy.split('_');
            orderBy[orderField] = orderDirection.toLowerCase();
        }

        const take = maxRows ? parseInt(maxRows, 10) : undefined;
        const record = await prisma.target.findMany({ where, orderBy: orderBy, take, include: {creator: true} });

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

        const record = await prisma.target.findUnique({ where: { id: numericId }, include : { users: true } });

        const toRes  = record as any;
        if(record){
            
            toRes['countLikedUsers'] = record.users.length;
        }

        res.json({
            toRes
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});

router.post('/post', async (req : Request, res: Response) => {
    try {
        const data = req.body;
        const record = await prisma.target.create({ data });

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

        const record = await prisma.target.deleteMany({ where });

        res.json({
            record
        });
    } catch (error) {
        console.log(error);
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

        const record = await prisma.target.update({ where: { id: numericId }, data });


        res.json({
            record
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export { router as router_target };
