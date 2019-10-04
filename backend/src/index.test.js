const test = require('tape');
const supertest = require('supertest');
const app = require('./config/server');

test('GET /weather', (t) => {
    supertest(app).get('/weather').expect('Content-Type', /json/)
        .expect(200).end((err, res) => {
        t.error(err, 'Weather List - Requisition - OK!')
        t.assert(!res.body.error, "Weather List - Content - OK!")
    })

    supertest(app).get('/weather/find')
        .query({"city": "Joinville"})
        .expect('Content-Type', /json/)
        .expect(200).end((err, res) => {
        t.error(err, 'Weather Specific Find By City Name = Joinville - Requisition - OK!')
        t.assert(res.body[0].city.name === "Joinville", "Weather Specific Find By City Name = Joinville - Content - OK!")
    })

    supertest(app).get('/weather/find')
        .query({"date": "2019-10-04T20:00:20.050Z"})
        .expect('Content-Type', /json/)
        .expect(200).end((err, res) => {
        t.error(err, 'Weather Specific Find By Date - Requisition - OK!')
        t.assert(res.body[0].city.name === "Joinville", "Weather Specific Find By Date - Content - OK!")
        t.end()
    })
})

test('POST /weather', (t) => {
    supertest(app).post('/weather').send({
        'observation': 'Observação teste'
    })
        .set("city_id", 3459712)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200).end((err, res) => {
        t.error(err, 'Weather Post City Id(3459712-Joinville) - Requisition - OK!')
        t.assert(res.body.city.name === "Joinville", "Weather Post City Id - Content - OK!")
    })

    supertest(app).post('/weather').send({
        'observation': 'Observação teste'
    })
        .set("lat", -26.3)
        .set("lon", -48.85)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200).end((err, res) => {
        t.error(err, 'Weather Post Coords (lat: -26.3, long: -48.85 = Joinville) - Requisition - OK!')
        t.assert(res.body.city.name === "Joinville", "Weather Post Coords - Content - OK!")
        t.end()
    })
})

test('DELETE /weather', (t) => {
    supertest(app).delete('/weather')
        .query({"id": "5d97a550a12c671de8ec0ddc"})
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200).end((err, res) => {
        t.error(err, 'Weather Delete - Requisition - OK!')
        t.end()
    })
})