require('dotenv').config()
const { close, connect } = require('../utils/database-utils');
connect()
const request = require('supertest')
const app = require('../app');
const InvalidIdError = require('../errors/invalid-id-error');
const { ObjectId } = require('mongodb');
const IdNotFoundError = require('../errors/id-not-found-error');
const YearMissingError = require('../errors/year-missing-error');
const ColorMissingError = require('../errors/color-missing-error');
const MakerMissingError = require('../errors/maker-missing-error');
const ModelMissingError = require('../errors/model-missing-error');
let vehicleId
const testData = {
    maker: 'ford',
    model: 'fiesta',
    year: 2013,
    color: 'white'
}
const stop = require('../server');

describe('Handler Test', () => {
    beforeAll(async () => {
        const testVehicle = await request(app).post('/api/vehicles').send(testData)

        vehicleId = testVehicle.body.id
    })

    afterEach(async () => {
        await stop();
        await close()
        await new Promise((resolve) => setTimeout(() => resolve(), 5000))
    })

    test('Get All Vehicles', async () =>{
        const res = await request(app).get('/api/vehicles')
            .expect(200)
        expect(res.body.length >= 1).toBe(true)
    })

    test('Get Vehicles by Id', async () =>{
        const res = await request(app).get(`/api/vehicles/${vehicleId}`)
            .expect(200)
        expect(res.body).toEqual({ id: vehicleId, ...testData})
    })

    test('Shouldn\'t Get Vehicles by Id by invalid Id', async () =>{
        const res = await request(app).get('/api/vehicles/asfgsdghsdfg')

        expect(res.status).toEqual(new InvalidIdError().statusCode)
        expect(JSON.parse(res.error.text).error).toEqual(new InvalidIdError().message)
    })

    test('Shouldn\'t Get Vehicles by Id by not found', async () =>{
        const res = await request(app).get(`/api/vehicles/${new ObjectId()}`)

        expect(res.status).toEqual(new IdNotFoundError().statusCode)
        expect(JSON.parse(res.error.text).error).toEqual(new IdNotFoundError().message)
    })

    test('Insert new vehicle', async () =>{
        const insertData = {
            maker: 'chevrolet',
            model: 'cruze',
            year: 2018,
            color: 'grey'
        }
        const res = await request(app).post('/api/vehicles')
            .send(insertData)
            .expect(200)

        const newId = res.body.id
        expect(res.body).toEqual({ id: newId, ...insertData})
    })

    test('Shouldn\'t Insert new vehicle by year missing', async () =>{
        const insertData = {
            maker: 'chevrolet',
            model: 'cruze',
            color: 'grey'
        }
        const res = await request(app).post('/api/vehicles')
            .send(insertData)
            .expect(400)

        expect(res.status).toEqual(new YearMissingError().statusCode)
        expect(JSON.parse(res.error.text).error).toEqual(new YearMissingError().message)
    })

    test('Shouldn\'t Insert new vehicle by color missing', async () =>{
        const insertData = {
            maker: 'chevrolet',
            model: 'cruze',
            year: 2018,
        }
        const res = await request(app).post('/api/vehicles')
            .send(insertData)
            .expect(400)

        expect(res.status).toEqual(new ColorMissingError().statusCode)
        expect(JSON.parse(res.error.text).error).toEqual(new ColorMissingError().message)
    })

    test('Shouldn\'t Insert new vehicle by maker missing', async () =>{
        const insertData = {
            model: 'cruze',
            year: 2018,
            color: 'grey'
        }
        const res = await request(app).post('/api/vehicles')
            .send(insertData)
            .expect(400)

        expect(res.status).toEqual(new MakerMissingError().statusCode)
        expect(JSON.parse(res.error.text).error).toEqual(new MakerMissingError().message)
    })

    test('Shouldn\'t Insert new vehicle by model missing', async () =>{
        const insertData = {
            maker: 'chevrolet',
            year: 2018,
            color: 'grey'
        }
        const res = await request(app).post('/api/vehicles')
            .send(insertData)
            .expect(400)

        expect(res.status).toEqual(new ModelMissingError().statusCode)
        expect(JSON.parse(res.error.text).error).toEqual(new ModelMissingError().message)
    })

    test('Update a vehicle', async () =>{
        const updateData = {
            maker: 'chevrolet',
        }

        await request(app).put(`/api/vehicles/${vehicleId}`)
            .send(updateData)
            .expect(200)

        const updatedData = await request(app).get(`/api/vehicles/${vehicleId}`)
            .expect(200)

        expect(updatedData.body.maker).toEqual(updateData.maker)
    })

    test('Shouldn\'t Update new vehicle by invalid id', async () =>{
        const updateData = {
            maker: 'chevrolet',
        }
        const res = await request(app).put('/api/vehicles/sadfgsdfgsdf')
            .send(updateData)
            .expect(422)

            expect(res.status).toEqual(new InvalidIdError().statusCode)
            expect(JSON.parse(res.error.text).error).toEqual(new InvalidIdError().message)
    })

    test('Shouldn\'t Update new vehicle by id not found', async () =>{
        const updateData = {
            maker: 'chevrolet',
        }
        const res = await request(app).put(`/api/vehicles/${new ObjectId()}`)
            .send(updateData)
            .expect(404)

            expect(res.status).toEqual(new IdNotFoundError().statusCode)
            expect(JSON.parse(res.error.text).error).toEqual(new IdNotFoundError().message)
    })

    test('Delete a vehicle', async () =>{
        const insertData = {
            maker: 'chevrolet',
            model: 'cruze',
            year: 2018,
            color: 'grey'
        }
        const insertedData = await request(app).post('/api/vehicles')
            .send(insertData)
            .expect(200)

        const newId = insertedData.body.id

        await request(app).delete(`/api/vehicles/${newId}`)
            .expect(200)

        const fetchData = await request(app).get('/api/vehicles')
            .expect(200)

        const deletedData = await request(app).get(`/api/vehicles/${newId}`)
            .expect(404)

        expect(fetchData.body).toHaveLength(2)
        expect(deletedData.status).toEqual(new IdNotFoundError().statusCode)
        expect(JSON.parse(deletedData.error.text).error).toEqual(new IdNotFoundError().message)
    })

    test('Shouldn\'t Delete new vehicle by invalid id', async () =>{
        const res = await request(app).delete('/api/vehicles/sadfgsdfgsdf')
            .expect(422)

        expect(res.status).toEqual(new InvalidIdError().statusCode)
        expect(JSON.parse(res.error.text).error).toEqual(new InvalidIdError().message)
    })

    test('Shouldn\'t Delete new vehicle by id not found', async () =>{
        const res = await request(app).delete(`/api/vehicles/${new ObjectId()}`)
            .expect(404)

        expect(res.status).toEqual(new IdNotFoundError().statusCode)
        expect(JSON.parse(res.error.text).error).toEqual(new IdNotFoundError().message)
    })
})