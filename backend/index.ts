import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { router_put } from './app_routes/index';

const app: Express = express();
const port = 3000;

// nie ósówaj !!!!
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    next();
});
app.use('/api/post', router_put);
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})

/*
    1. user
    2. wyszukiwanie
    3. sortowanie 
*/