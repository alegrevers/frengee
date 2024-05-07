const Vehicle = require('../repository/vehicle-repository')
const express = require('express')
const VehicleValidator = require('../validator/vehicle-validator')
const VehicleConverter = require('../converter/vehicle-converter')
var router = express.Router()

router.get('/', async function(req, res) {
  try {
    const carList = await Vehicle.findAll()

    res.send(carList.map(car => new VehicleConverter().toDto(car)))
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

router.get('/:id', async function(req, res) {
  try {
    await await new VehicleValidator().validateId(req.params.id)
    const car = await Vehicle.findById(req.params.id)

    res.json(new VehicleConverter().toDto(car))
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

router.post('/', async function(req, res) {
  try {
    new VehicleValidator().validateInsert(req.body)

    const insertedCar = await Vehicle.insert(req.body)
    const car = await Vehicle.findById(insertedCar.insertedId)

    res.json(new VehicleConverter().toDto(car))
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

router.put('/:id', async function(req, res) {
  try {
    await new VehicleValidator().validateId(req.params.id)

    const car = await Vehicle.update(req.params.id, req.body)

    res.json(new VehicleConverter().toDto(car))
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

router.delete('/:id', async function(req, res) {
  try {
    await new VehicleValidator().validateId(req.params.id)

    const car = await Vehicle.delete(req.params.id)

    res.json(new VehicleConverter().toDto(car))
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

module.exports = router
