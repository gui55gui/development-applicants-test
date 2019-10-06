const Weather = require('../models/Weather');
const api = require('../services/openWeatherService');

const getWeather = async ({city_name, city_id, lat, lon}) => {

    let weather = null;

    let getParams = {appid: "c6a44a4fc4ee550e904e908b7a325947", lang: "pt", units: "metric"};

    if (lat && lon) {
        getParams.lat = lat;
        getParams.lon = lon;
    } else if (city_id) {
        getParams.id = city_id;
    } else if (city_name) {
        getParams.q = city_name;
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
        let {city_name, city_id, lat, lon, observation} = req.body;
        const weatherApi = await getWeather({city_name, city_id, lat, lon});
        const {cod, message, id: cityId, name: cityName} = weatherApi.data;
        if (cod === 200) {
            lat = weatherApi.data.coord.lat;
            lon = weatherApi.data.coord.lon;
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
        } else {
            return res.status(cod).send({message});
        }
    },
    async index(req, res) {
        try {
            const weathers = await Weather.aggregate(
                [
                    {
                        $addFields: {
                            convertedDate: {$dateToString: {format: "%d/%m/%Y", date: "$date", timezone: 'America/New_York'}}
                        }
                    }
                ]
            );

            return res.json(weathers);
        } catch (err) {
            return res.status(400).send({message: 'Erro ao buscar a lista de Climas'});
        }
    },
    async show(req, res) {
        const {id} = req.params;

        //FindById
        if (id) {
            const weather = await Weather.findById({_id: id});
            return res.json(weather);
        } else {
            const {city, date} = req.query;
            let dtIni = null;
            let dtEnd = null;
            let paramQtd = 0;

            if (city && city !== "") paramQtd++;

            if (date && date !== "null" && date !== "") {
                paramQtd++;
                const dateAux = date.split("/");
                dtIni = new Date();
                dtEnd = new Date();
                const dateFormat = new Date(parseInt(dateAux[2]), parseInt(dateAux[1]), parseInt(dateAux[0], 0, 0, 0));
                dtIni.setDate(dateFormat.getDate());
                dtIni.setMonth(dateFormat.getMonth());
                dtIni.setFullYear(dateFormat.getFullYear());
                dtIni.setHours(0, 0, 0 ,0);
                dtEnd.setDate(dateFormat.getDate());
                dtEnd.setMonth(dateFormat.getMonth());
                dtEnd.setFullYear(dateFormat.getFullYear());
                dtEnd.setHours(23,59,59,999);
            } else {
                dtIni = "";
                dtEnd = "";
            }

            const findOneParam = {
                $match: {
                    $or: [
                        {'city.name': city},
                        {
                            $and: [
                                {"date": {$gte: dtIni}}, {"date": {$lte: dtEnd}}
                            ]
                        }
                    ]
                }
            };
            const findTwoParams = {$match: {$and: [{'city.name': city}, {"date": {$gte: dtIni}}, {"date": {$lte: dtEnd}}]}};

            const weather = await Weather.aggregate(
                [

                    paramQtd === 1 ? findOneParam : findTwoParams,
                    {
                        $addFields: {
                            convertedDate: {$dateToString: {format: "%d/%m/%Y", date: "$date", timezone: 'America/New_York'}}
                        }
                    }
                ]
            );
            return res.json(weather);
        }
    },
    async destroy(req, res) {
        try {
            await Weather.findByIdAndDelete(req.params.id);
            return res.status(200).send({message: 'OK'});
        } catch (err) {
            return res.status(400).send({message: 'Erro ao deletar o Clima!'});
        }
    }
}