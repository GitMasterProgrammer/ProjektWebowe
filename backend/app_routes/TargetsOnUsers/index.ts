import { PrismaClient } from '@prisma/client';
import { Express, Request, Response, Router } from 'express';
import { unsetKeys } from '../../functions/unsetKeys';
import { convertToInt } from '../../functions/convertToInt';

const prisma = new PrismaClient();

const router = Router();


router.post('/', async (req, res) => {
    const userId = typeof req.query.userId === 'string' ? req.query.userId : '';
    const targetId = typeof req.query.targetId === 'string' ? req.query.targetId : '';

    if (!userId || !targetId) {
        return res.status(400).json({ error: 'userId i targetId are required' });
    }

    try {
        const favourite = await prisma.targetsOnUsers.create({
            data: {
                userId: parseInt(userId),
                targetId: parseInt(targetId),
            },
        });
        res.status(200).json(favourite);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});


router.delete('/', async (req, res) => {
    const userId = typeof req.query.userId === 'string' ? req.query.userId : '';
    const targetId = typeof req.query.targetId === 'string' ? req.query.targetId : '';

    if (!userId || !targetId) {
        return res.status(400).json({ error: 'userId i targetId are required' });
    }
   
    try {
       const deletedFavourite = await prisma.targetsOnUsers.delete({
         where: {
           userId_targetId: {
             userId: parseInt(userId),
             targetId: parseInt(targetId),
           },
         },
       });
       res.status(200).json(deletedFavourite);
    } catch (error) {
       res.status(500).json({ error: error });
    }
});

export { router as router_favourites };