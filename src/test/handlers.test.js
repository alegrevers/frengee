const express = require('express');
const VehicleHandler = require('../handlers/vehicle-handler')
const vehicleHandler = new VehicleHandler()
const supertest = require('supertest')
const router = require('../routes/vehicles');
const Vehicle = require('../repository/vehicle-repository');
const { close, connect } = require('../utils/database-utils');
var app = express();
app.use('/', router);
const request = supertest(app)

describe('Routes Test', () => {

    beforeAll(() => {
        connect();
    });

      afterAll(() => {
        close();
        // server.close();
      });

    beforeEach(() => {
        app.post('/', async () => {
            const insertBody = {
                model: 'fiesta',
                make: 'ford',
                year: '2013',
                color: 'white'
            }

            const insertedCar = await Vehicle.insert(insertBody)
            console.log('🚀 ~ insertedCar:', insertedCar)
        })
    });

    // afterEach(() => {
    //     process.env = originalEnv;
    // });

    test('Get All Vehicles', async () =>{
        const res = await request.get('/')
        console.log('🚀 ~ res:', res)
    })
})