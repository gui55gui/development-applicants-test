const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();
const bodyParser = require('body-parser');
const allowCors = require('./cors');

mongoose.connect('mongodb://localhost:27017/weatherallog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(allowCors);
app.use('/api', routes);

app.listen(3333);

module.exports = app;