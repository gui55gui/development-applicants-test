const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
    city: {
        id: Number,
        name: String
    },
    coords: {
        lat: Number,
        lon: Number
    },
    temp: Number,
    tempMin: Number,
    tempMax: Number,
    description: String,
    icon: String,
    observation: String,
    date: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Weather', WeatherSchema);
