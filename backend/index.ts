import express, { Express, Request, Response } from 'express';
import { router_location } from './app_routes/Location';
import { router_login } from './app_routes/Login';
import { router_user } from './app_routes/User';
import { router_target } from './app_routes/Target';
import { router_favourites } from './app_routes/TargetsOnUsers';
import cors from "cors";


const app: Express = express();
const port = 3000;

// nie ósówaj !!!!
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use( cors())

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
app.use('/api/favourites', router_favourites);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})
/*
    1. user
    2. wyszukiwanie
    3. sortowanie 
*/