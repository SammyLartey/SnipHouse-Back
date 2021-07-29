let express = require('express');

const app = express();

const { body, query, param } = require('express-validator');

app.use(express.json());
require('dotenv').config();
app.use([
    body('*').trim().escape(),
    param('*').trim().escape(),
    query('*').trim().escape()
]);

//This route handles all requests
app.use('/api', require('./api'));

module.exports = app;
