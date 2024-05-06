import express, { Express, Request, Response } from 'express';
import { router_location } from './app_routes/Location';
import { router_login } from './app_routes/Login';
import { router_user } from './app_routes/User';
import { router_target } from './app_routes/Target';

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

app.use('/api/login', router_login);
app.use('/api/user', router_user);
app.use('/api/target', router_target);
app.use('/api/location', router_location);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})

/*
    1. user
    2. wyszukiwanie
    3. sortowanie 
*/