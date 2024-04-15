const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const router = express.Router();
router.use(express.json());

router.get('/:table', async (req, res) => {
    try {
        const { table } = req.params;
        const where = req.body;
        
        if (Object.keys(where).length === 0) {
            const record = await prisma[table].findMany();

            res.json({
                record
            });
        } else {
            // Jeśli obiekt where zawiera kryteria wyszukiwania, zwracamy tylko te rekordy
            const record = await prisma[table].findMany({
                where,
            });
            res.json({
                record
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { router_get: router };
