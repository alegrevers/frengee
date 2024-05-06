const { database } = require('../utils/database-utils')
const express = require('express')
var router = express.Router()

// conectar com banco via camada de repository e iterar com as models aqui
/* GET ALL VEHICLES */
router.get('/', function(req, res) {
  // const carList = database.find()
  const carList = 'nada'
  res.send(carList)
})

/* GET A VEHICLE BY ID */
router.get('/:id', function(req, res) {
  const car = database.findById(req.params.id)
  res.json(car)
})

/* INSERT A NEW VEHICLE */
router.post('/', function(req, res) {
  const car = database.insertOne(req.body)
  res.json(car)
})

/* UPDATE A VEHICLE */
router.put('/:id', function(req, res) {
  const car = database.updateOne(req.params.id, req.body)
  res.json(car)
})

/* DELETE A VEHICLE */
router.delete('/:id', function(req, res) {
  const car = database.deleteOne(req.params.id)
  res.json(car)
})

module.exports = router
