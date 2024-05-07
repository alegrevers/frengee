class VehicleConverter {
    toDto (databaseData) {
        const { _id,
            make,
            year,
            color,
            doors,
            model,
            driveType,
            induction,
            transmission,
            engineCylinders,
            engineDisplacement,
            transmissionSpeeds } = databaseData

        return {
            id: _id,
            make: make,
            year: year,
            color: color,
            doors: doors,
            model: model,
            driveType: driveType,
            induction: induction,
            transmission: transmission,
            engineCylinders: engineCylinders,
            engineDisplacement: engineDisplacement,
            transmissionSpeeds: transmissionSpeeds,
        }
    }
}

module.exports = VehicleConverter