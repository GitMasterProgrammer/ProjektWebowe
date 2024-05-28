import { PrismaClient } from '@prisma/client';
import { Express, Request, Response, Router } from 'express';
import { convertToInt } from '../../functions/convertToInt';
import { unsetKeys } from '../../functions/unsetKeys';
import CustomRequest from '../../interfaces/customReq';


const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

const router = Router();


router.get('/get', async (req: CustomRequest, res: Response) => {
    try {
        const ord = JSON.parse(JSON.stringify(req.convertedQuery))
        const where = unsetKeys(req.convertedQuery, ['maxRows', 'orderBy']) 

        const maxRows = ord.maxRows ? ord.maxRows : undefined;
        
        let orderBy: any = {};

        if (ord.orderBy) {
            const [orderField, orderDirection] = ord.orderBy.split('_');
            orderBy[orderField] = orderDirection.toLowerCase();
        }

        const take = maxRows ? parseInt(maxRows, 10) : undefined;
        const record = await prisma.user.findMany({ where, orderBy: orderBy, take });

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

        // if (isNaN(numericId)) {
        //     return res.status(400).json({ error: 'Invalid ID format' });
        // }

        const user = await prisma.user.findUnique({
            where: { id: numericId },
            include: { Locations: true }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const locationCount = user.Locations.length;
        const totalRating = user.Locations.reduce((sum, location) => sum + location.rating, 0);
        const averageRating = locationCount > 0 ? totalRating / locationCount : 0;

        res.json({
            user,
            locationCount,
            averageRating
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
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

        const record = await prisma.user.findUnique({ where: { id : numericId }, include: { favourites : { include: { target : true } } } });

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
            res.status(400).json({status: 'failed', error: 'Email already in use'})
            return
        }
        
        /*const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;*/

        const newUser = await prisma.user.create({ data });

        res.json({
            status: "success",
            data: newUser
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

export { router as router_user };
