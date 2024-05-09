const getDatabase = require("../utils/database-utils").getDatabase;
var ObjectId = require('mongodb').ObjectId;

class Vehicle {
    constructor() {
        this.connect()
    }

    async connect() {
        if (!this.collection) {
            const database = await getDatabase();
            this.collection = database.collection(process.env.DATABASE_COLLECTION);
        }
    }

    async findAll() {
        await this.connect();
        return this.collection.find().toArray()
    }

    async findById(id) {
        await this.connect();
        return this.collection.findOne({ _id: new ObjectId(id)})
    }

    async insert(insertData) {
        await this.connect();
        return this.collection.insertOne(insertData)
    }

    async update(id, updateData) {
        await this.connect();
        return this.collection.findOneAndUpdate({ _id: new ObjectId(id)}, { $set: updateData }, { returnNewDocument: true })
    }

    async delete(id) {
        await this.connect();
        return this.collection.findOneAndDelete({ _id: new ObjectId(id)})
    }
}

module.exports = new Vehicle()