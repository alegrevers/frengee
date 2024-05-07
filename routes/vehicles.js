const Vehicle = require('../repository/vehicle-repository')
const express = require('express')
var router = express.Router()

// conectar com banco via camada de repository e iterar com as models aqui
/* GET ALL VEHICLES */
router.get('/', async function(req, res) {
  const carList = await Vehicle.findAll()
  console.log('🚀 ~ carList:', carList)
  res.send(carList)
})

/* GET A VEHICLE BY ID */
router.get('/:id', function(req, res) {
  const car = Vehicle.findById(req.params.id)
  res.json(car)
})

/* INSERT A NEW VEHICLE */
router.post('/', function(req, res) {
  const car = Vehicle.insert(req.body)
  res.json(car)
})

/* UPDATE A VEHICLE */
router.put('/:id', function(req, res) {
  const car = Vehicle.update(req.params.id, req.body)
  res.json(car)
})

/* DELETE A VEHICLE */
router.delete('/:id', function(req, res) {
  const car = Vehicle.delete(req.params.id)
  res.json(car)
})

module.exports = router
