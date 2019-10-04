const Weather = require('../models/Weather');
const api = require('../services/openWeatherService');

const getWeather = async (params) => {
    const {city_id, lat, lon} = params;
    let weather = null;

    let getParams = {appid: "c6a44a4fc4ee550e904e908b7a325947", lang: "pt", units: "metric"};

    if (city_id) {
        getParams.id = city_id;
    }
    if (lat && lon) {
        getParams.lat = lat;
        getParams.lon = lon;
    }

    try {
        weather = await api.get('/weather', {params: getParams});
    } catch ({response}) {
        weather = response;
    }
    return weather;
}

module.exports = {
    async store(req, res) {
        const {observation} = req.body;
        const weatherApi = await getWeather(req.headers);
        const {id: cityId, name: cityName} = weatherApi.data;
        const {lat, lon} = weatherApi.data.coord;
        const {temp, temp_min: tempMin, temp_max: tempMax} = weatherApi.data.main;
        const {description, icon} = weatherApi.data.weather[0];
        const weather = await Weather.create({
            city: {id: cityId, name: cityName},
            coords: {lat, lon},
            temp,
            tempMin,
            tempMax,
            description,
            icon,
            observation
        });
        return res.json(weather);
    },
    async index(req, res) {
        try {
            const weathers = await Weather.find();
            return res.json(weathers);
        } catch(err) {
            return res.status(400).send({error: 'Error to get weather list'});
        }
    },
    async show(req, res) {
        const {city, date} = req.query;
        const weather = await Weather.find({
            $or: [{'city.name': city}, {'date': date}]
        });
        return res.json(weather);
    },
    async destroy(req, res) {
        try {
            await Weather.findByIdAndDelete(req.query.id);
            return res.send();
        } catch (err) {
            return res.status(400).send({error: 'Error deleting weather'});
        }
    }
}