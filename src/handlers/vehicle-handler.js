const Vehicle = require('../repository/vehicle-repository')
const VehicleConverter = require("../converter/vehicle-converter")
const VehicleValidator = require("../validator/vehicle-validator")
const converter = new VehicleConverter()
const validator = new VehicleValidator()

class VehicleHandler {
    async findAll(req, res) {
        try {
            const carList = await Vehicle.findAll()

            res.send(carList.map(car => converter.toDto(car)))
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async findById (req, res, next) {
        try {
            const filter = req.params.id
            await validator.validateId(filter)
            const car = await Vehicle.findById(filter)

            res.json(converter.toDto(car))
        } catch (error) {
            next(error)
        }
    }


    async insert (req, res,next) {
        try {
            const insertData = req.body
            validator.validateInsert(insertData)

            const insertedCar = await Vehicle.insert(insertData)
            const car = await Vehicle.findById(insertedCar.insertedId)

            res.json(converter.toDto(car))
        } catch (error) {
            next(error)
        }
    }

    async update (req, res, next) {
        try {
            await validator.validateId(req.params.id)

            const car = await Vehicle.update(req.params.id, req.body)

            res.json(converter.toDto(car))
        } catch (error) {
            next(error)
        }
    }

    async deleteVehicle (req, res, next) {
        try {
            await validator.validateId(req.params.id)

            const car = await Vehicle.delete(req.params.id)

            res.json(converter.toDto(car))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = VehicleHandler