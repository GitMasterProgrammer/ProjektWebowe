
import { PrismaClient } from '@prisma/client';
import { Express, Request, Response, Router } from 'express';

const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = Router();

router.post('/', async (req : Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const user = await prisma.user.findUnique({ where: { email: email } });
      if (!user) {
        return res.status(400).json({ message: '🐵🐵🐵User not found y are the nogger🐵🐵🐵' });
      }

      const isMatch = password == user.password;
      if (!isMatch) {
        return res.status(400).json({ message: '🐵🐵🐵Invalid credentials nogger🐵🐵🐵' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ 'token': token, 'id' : user.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '🐵🐵🐵Server error something broke🐵🐵🐵' });
    }
});

export {router as router_login};