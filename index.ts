import express, { Express, Request, Response } from 'express';

import { router_put } from './app_routes/index';
import { router_post } from './app_routes/post';
import { router_get } from './app_routes/get';

const app: Express = express();
const port = 3000;

// nie ósówaj !!!!
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    next();
});

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use('/api/post', router_post);
app.use('/api/getall', router_put);
app.use('/api/get', router_get);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})

/*
    1. user
    2. wyszukiwanie
    3. sortowanie 
*/