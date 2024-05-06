import { PrismaClient } from '@prisma/client';
import e, { Express, Request, Response, Router } from 'express';
import { convertToInt } from '../../functions/convertToInt';
const prisma = new PrismaClient();


const router = Router();


router.get('/get', async (req: Request, res: Response) => {
    try {
        const where = req.body.where;
        const orderBy = req.body.orderBy;
        const maxRows = req.body.maxRows;

        const take = maxRows ? parseInt(maxRows, 10) : undefined;
        const record = await prisma.user.findMany({ where, orderBy: orderBy, take });


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
        
        const record = await prisma.user.findUnique({ where: { id: numericId } });        

        res.json({
            record
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});

router.get('/get/:email', async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        
        const record = await prisma.user.findUnique({ where: { email: email } });        

        res.json({
            record
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});

router.get('/get/likedTargets/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        // TODO: mechanizm doawania i usuwania do ulibionych
        
        const record = await prisma.user.findUnique({ where: { id : numericId }, include: { Targets : true } });

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

        const check = await prisma.user.findUnique({ where: {email: data.email}})

        if(check) {
            res.status(500).json({status: 'failed', error: 'Email already in use'})
            return
        }

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

        const record = await prisma.user.deleteMany({ where });

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
        const data = req.body.data;

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





/*router.get('/:table/likedUsers', async (req: Request, res: Response) => {
    try{
        const where = req.body.where;
        const record = await prisma.target.findUnique({ where: where, include : {users: true} })

        return res.json({
            users: record?.users,
            count: record?.users.length
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});*/

export { router as router_user };
