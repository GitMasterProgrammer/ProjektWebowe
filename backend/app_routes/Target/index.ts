import { PrismaClient } from '@prisma/client';
import { Express, Request, Response, Router } from 'express';
import { unsetKeys } from '../../functions/unsetKeys';
import { convertToInt } from '../../functions/convertToInt';

const prisma = new PrismaClient();

const router = Router();


router.get('/get', async (req: Request, res: Response) => {
    try {
        // Dziwny ten kod?
        const ord = JSON.parse(JSON.stringify(req.query))
        const where = unsetKeys(convertToInt(JSON.parse(JSON.stringify(req.query))), ['maxRows', 'orderBy']) 
        // TODO: dostosuj ten kod (masz tu jak ja składał opderBY, który wysyłałem wcześcniej)
        // TODO: nie moge wysyłać obiektów w, ale tak moge: orderby http://localhost:3000/api/target/get?name=xd&order=name_asc&maxRows=25
        // TODO: zrób żeby działało, chyba że teraz działa, to napisz jak to wykożystać
        // const orderBy = [{
        //     name: "asc"
        // }];
        // switch (order){
        //     case "likes":
        //         orderBy.push({
        //             likes: "desc"
        //         })
        //         break
        //     case "name_desc":
        //         orderBy.name = "name_desc";
        // }


        const orderBy = ord.orderBy ? ord.orderBy : undefined;
        const maxRows = ord.maxRows ? ord.maxRows : undefined;

        const take = maxRows ? parseInt(maxRows, 10) : undefined;
        const record = await prisma.target.findMany({ where, orderBy: orderBy, take });

        res.json({
            record
        });
    } catch (error) {
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
