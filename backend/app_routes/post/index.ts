import { PrismaClient } from '@prisma/client';
import { Express, Request, Response, Router } from 'express';

const prisma = new PrismaClient();

const router = Router();

router.post('/login', (req, res) => {
    res.json({"tak": "nie"})
})

router.post('/user', async (req : Request, res: Response) => {
    try {
        const data = req.body;
        console.log(req.body)
        const record = await prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                name: data.name,
            }

        });
        res.json({
            "status": "success",
            "data": record
        });
    } catch (error) {
        //console.error(error);
        res.status(500).json({ error: error });
    }
});

export {router as router_post};
