const MongoClient = require("mongodb").MongoClient

class MongoConnector {
    constructor () {
        const connectionString = process.env.DATABASE_URI
        this.client = new MongoClient(connectionString)
    }

    async connect() {
        await this.client.connect()

        this.database = this.client.db(process.env.DATABASE_NAME)
    }

    close () {
        this.client.close()
    }
}

module.exports = new MongoConnector().database
