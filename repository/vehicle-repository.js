const MongoConnector = require("../utils/database-utils");

class Vehicle {
    constructor() {
        this.collection
        this.connect()
    }

    async connect () {
        const connector = new MongoConnector()
        await connector.connect()
        this.collection = connector.database.collection(process.env.DATABASE_COLLECTION)
    }

    async findAll() {
        return this.collection.find().toArray()
    }

    async findById(id) {
        return this.collection.findOne({ _id: id}).toArray()
    }

    async insert(insertData) {
        return this.collection.insertOne(insertData).toArray()
    }

    async update(id, updateData) {
        return this.collection.updateOne({ _id: id}, updateData).toArray()
    }

    async delete(id) {
        return this.collection.deleteOne({ _id: id}).toArray()
    }
}

module.exports = new Vehicle()