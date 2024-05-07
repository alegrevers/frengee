const MongoConnector = require("../utils/database-utils");
var ObjectId = require('mongodb').ObjectId;

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
        return this.collection.findOne({ _id: new ObjectId(id)})
    }

    async insert(insertData) {
        return this.collection.insertOne(insertData)
    }

    async update(id, updateData) {
        return this.collection.findOneAndUpdate({ _id: new ObjectId(id)}, { $set: updateData }, { returnNewDocument: true })
    }

    async delete(id) {
        return this.collection.findOneAndDelete({ _id: new ObjectId(id)})
    }
}

module.exports = new Vehicle()