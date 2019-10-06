require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();
const bodyParser = require('body-parser');
const allowCors = require('./cors');

mongoose.connect(process.env['MONGO_URL'], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(allowCors);
app.use('/api', routes);

app.listen(process.env['SV_PORT']);

module.exports = app;