require('dotenv').config()
const { close, connect } = require('../utils/database-utils');
connect()
const request = require('supertest')
const app = require('../app');
const server = require('../server');

describe('Routes Test', () => {

    afterAll(() => {
        server.close()
    })

    test('Get All Vehicles', async () =>{
        const res = await request(app).get('/api/vehicles')
        console.log('🚀 ~ res:', res)
    })
})