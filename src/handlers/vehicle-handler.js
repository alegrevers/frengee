const Vehicle = require('../repository/vehicle-repository')
const VehicleConverter = require("../converter/vehicle-converter")
const VehicleValidator = require("../validator/vehicle-validator")
const converter = new VehicleConverter()
const validator = new VehicleValidator()

class VehicleHandler {
    async findAll(req, res) {
        try {
            const carList = await Vehicle.findAll()
            console.log('🚀 ~ carList:', carList)

            res.send(carList.map(car => converter.toDto(car)))
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async findById (req, res, next) {
        try {
            await await validator.validateId(req.params.id)
            const car = await Vehicle.findById(req.params.id)

            res.json(converter.toDto(car))
        } catch (error) {
            next(error)
        }
    }


    async insert (req, res,next) {
        try {
            validator.validateInsert(req.body)

            const insertedCar = await Vehicle.insert(req.body)
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