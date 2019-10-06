const express = require('express');

const WeatherController = require('../controllers/WeatherController');

const routes = express.Router();

routes.get('/weather', WeatherController.index);
routes.get('/weather/find', WeatherController.show);
routes.get('/weather/find/:id', WeatherController.show);
routes.post('/weather', WeatherController.store);
routes.delete('/weather/:id', WeatherController.destroy);

module.exports = routes;