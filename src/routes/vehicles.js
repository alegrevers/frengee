const express = require('express')
const VehicleHandler = require('../handlers/vehicle-handler')
const vehicleHandler = new VehicleHandler()
var router = express.Router()

router.get('/', vehicleHandler.findAll)

router.get('/:id', vehicleHandler.findById)

router.post('/', vehicleHandler.insert)

router.put('/:id', vehicleHandler.update)

router.delete('/:id', vehicleHandler.deleteVehicle)

module.exports = router
