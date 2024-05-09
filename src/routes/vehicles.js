const express = require('express')
const VehicleHandler = require('../handlers/vehicle-handler')
const vehicleHandler = new VehicleHandler()
var router = express.Router()

router.get('/',
    /* #swagger.tags = ['Vehicles']
       #swagger.description = 'Endpoint para encontrar todos os veículos.' */
    vehicleHandler.findAll
)

router.get('/:id',
    /* #swagger.tags = ['Vehicles']
       #swagger.description = 'Endpoint para encontrar um veículo pelo id.' */
    vehicleHandler.findById
)

router.post('/',
    // #swagger.tags = ['Vehicles']
    // #swagger.description = 'Endpoint para inserir um veículo.'

    /* #swagger.parameters['insertData'] = {
            in: 'body',
            description: 'Informações do veículo.',
            required: true,
            schema: { $ref: "#/definitions/AddVehicles" }
    } */
    vehicleHandler.insert
)

router.put('/:id',
    // #swagger.tags = ['Vehicles']
    // #swagger.description = 'Endpoint para atualizar um veículo.'

    /* #swagger.parameters['updateData'] = {
            in: 'body',
            description: 'Informações do veículo.',
            schema: { $ref: "#/definitions/EditVehicles" }
    } */
    vehicleHandler.update
)

router.delete('/:id',
    // #swagger.tags = ['Vehicles']
    // #swagger.description = 'Endpoint para atualizar um veículo.'

    vehicleHandler.deleteVehicle
)

module.exports = router
