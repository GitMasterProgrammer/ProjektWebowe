import { PrismaClient } from '@prisma/client';
import { Express, Request, Response, Router } from 'express';

const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = Router();

router.post('/login', async (req : Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const user = await prisma.user.findUnique({ where: { email: email } });
      if (!user) {
        return res.status(400).json({ message: '🐵🐵🐵User not found y are the nogger🐵🐵🐵' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: '🐵🐵🐵Invalid credentials nogger🐵🐵🐵' });
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '🐵🐵🐵Server error something broke🐵🐵🐵' });
    }
});
  

router.post('/user', async (req : Request, res: Response) => {
    try {
        const data = req.body;
        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        const record = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
            }
        });

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