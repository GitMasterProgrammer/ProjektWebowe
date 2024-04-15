const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const router = express.Router();
router.use(express.json());

router.post('/:table', async (req, res) => {
    try {
        const { table } = req.params;
        const data = req.body;
        console.log(req.body)
        const record = await prisma[table].create({
            data,
        });
        res.json({
            "status": "success",
            "data": record
        });
    } catch (error) {
        //console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = { router_post: router };
