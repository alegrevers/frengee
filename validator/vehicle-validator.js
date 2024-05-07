const Vehicle = require('../repository/vehicle-repository')
const { ObjectId } = require("mongodb")

class VehicleValidator {
    validateInsert (insertData) {
        const { make, year, color, model } = insertData

        if (!year) throw new Error('O campo ano é obrigatório')
        if (!color) throw new Error('O campo cor é obrigatório')
        if (!make) throw new Error('O campo marca é obrigatório')
        if (!model) throw new Error('O campo modelo é obrigatório')
    }

    async validateId (id) {
        if (!ObjectId.isValid(id)) throw new Error('ID inválido')

        const car = await Vehicle.findById(id)
        if (!car) throw new Error('ID não encontrado')
    }

}

module.exports = VehicleValidator