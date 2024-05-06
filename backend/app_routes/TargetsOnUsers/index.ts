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

        const orderBy = ord.orderBy ? ord.orderBy : undefined;
        const maxRows = ord.maxRows ? ord.maxRows : undefined;

        const take = maxRows ? parseInt(maxRows, 10) : undefined;
        const record = await prisma.targetsOnUsers.findMany({ where, orderBy: orderBy, take });


        res.json({
            record
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/get/unique', async (req: Request, res: Response) => {
    try {
        const where = req.body;


        const includes_query = req.query.join?.toString();
        
        const includes: { [key: string]: boolean } = {};
        
        if (includes_query){
            includes_query.split(',').forEach(element => {
                includes[element] = true;    
            });
        }

        // TODO: mechanizm doawania i usuwania do ulibionych
        // TODO: zwracanie wszystkich polubioych targetow dla uzytkownika

        const record = await prisma.targetsOnUsers.findUnique({ where: where, include : includes });

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
        const record = await prisma.user.create({ data });
        
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

        const record = await prisma.targetsOnUsers.deleteMany({ where });

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

        //TODO req tylko z id zmieniają.
        //TODO edycja tylko poszczególnych kolumn
        // TODO: kiedys zmienie tego leta
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const record = await prisma.user.update({ where: { id: numericId }, data });


        res.json({
            record
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export { router as router_targetOnUsers };
