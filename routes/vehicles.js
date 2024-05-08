const Vehicle = require('../repository/vehicle-repository')
const express = require('express')
const VehicleValidator = require('../validator/vehicle-validator')
const VehicleConverter = require('../converter/vehicle-converter')
const InvalidIdError = require('../errors/invalid-id-error')
const IdNotFoundError = require('../errors/id-not-found-error')
var router = express.Router()

router.get('/', async function(req, res) {
  try {
    const carList = await Vehicle.findAll()

    res.send(carList.map(car => new VehicleConverter().toDto(car)))
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

router.get('/:id', async function(req, res, next) {
  try {
    await await new VehicleValidator().validateId(req.params.id)
    const car = await Vehicle.findById(req.params.id)

    res.json(new VehicleConverter().toDto(car))
  } catch (error) {
    next(error)
  }
})

router.post('/', async function(req, res,next) {
  try {
    new VehicleValidator().validateInsert(req.body)

    const insertedCar = await Vehicle.insert(req.body)
    const car = await Vehicle.findById(insertedCar.insertedId)

    res.json(new VehicleConverter().toDto(car))
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async function(req, res, next) {
  try {
    await new VehicleValidator().validateId(req.params.id)

    const car = await Vehicle.update(req.params.id, req.body)

    res.json(new VehicleConverter().toDto(car))
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async function(req, res, next) {
  try {
    await new VehicleValidator().validateId(req.params.id)

    const car = await Vehicle.delete(req.params.id)

    res.json(new VehicleConverter().toDto(car))
  } catch (error) {
    next(error)
  }
})

module.exports = router
