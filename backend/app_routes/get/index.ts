import { PrismaClient } from '@prisma/client';
import { Express, Request, Response, Router } from 'express';
const prisma = new PrismaClient();

const router = Router();

type TableName = 'user' | 'target' | 'location'; 

router.post('/:table', async (req: Request, res: Response) => {
    try {
        const { table } = req.params;
        const where = req.body.where;
        const orderBy = req.body.orderBy;
        const maxRows = req.body.maxRows;
        const includes_query = req.query.join?.toString();
        
        const includes: { [key: string]: boolean } = {};
        
        if (includes_query){
            includes_query.split(',').forEach(element => {
                includes[element] = true;    
            });
        }

        // TODO: osobna ścierzka dla 1 elementu z findUnique, bo takie coś jest bezsensu: user = data.record[0]
        // TODO: dla target niech zwraca liczbę userów, którzy mają ją w ulubionych target.likes = count(target.users) (coś takiego)
        // TODO: mechanizm doawania i usuwania do ulibionych
        // TODO: zwracanie wszystkich polubioych targetow dla uzytkownika

        const take = maxRows ? parseInt(maxRows, 10) : undefined;

        let record;
        switch (table) {
            case 'user':
                record = await prisma.user.findMany({ where, orderBy: orderBy, take, include : includes });
                break;
            case 'target':
                record = await prisma.target.findMany({ where, orderBy: orderBy, take, include : {creator: true} });
                break;
            case 'location':
                record = await prisma.location.findMany({ where, orderBy: orderBy, take, include : includes });
                break;
            case 'targetsOnUsers':
                record = await prisma.targetsOnUsers.findMany({ where, orderBy: orderBy, take, include : includes });
                break;
            default:
                return res.status(400).json({ error: 'Invalid table name' });
        }

        res.json({
            record
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export { router as router_get };

