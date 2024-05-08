const getDatabase = require("../utils/database-utils").getDatabase;
var ObjectId = require('mongodb').ObjectId;

class Vehicle {
    constructor() {
        this.collection
        this.connect()
    }

    async connect () {
        const database = getDatabase()
        this.collection = database.collection(process.env.DATABASE_COLLECTION)
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