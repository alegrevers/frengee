const MongoConnector = require("../utils/database-utils");

class Vehicle {
    constructor() {
        this.collection = MongoConnector.collection(process.env.DATABASE_COLLECTION)
    }

    async findAll() {
        return this.collection.find()
    }

    async findById(id) {
        return this.collection.findOne({ _id: id})
    }

    async insert(insertData) {
        return this.collection.insertOne(insertData)
    }

    async update(id, updateData) {
        return this.collection.updateOne({ _id: id}, updateData)
    }

    async delete(id) {
        return this.collection.deleteOne({ _id: id})
    }
}

module.exports = new Vehicle()