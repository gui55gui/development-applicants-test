const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/weatherallog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(routes);

app.listen(3333);

module.exports = app;