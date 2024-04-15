const express = require('express');
const bodyParser = require('body-parser');

const { router_post } = require('./app_routes/post/index');
const { router_get } = require('./app_routes/get/index');

const app = express();
const port = 3000;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    next();
});
app.use('/api/post', router_post);
app.use('/api/get', router_get);
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
