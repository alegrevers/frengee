const MongoClient = require("mongodb").MongoClient
const { MongoMemoryServer } = require('mongodb-memory-server');
let connectionString = process.env.DATABASE_URI
let database

    async function connect() {
        try {
            if (process.env.NODE_ENV === 'test') {
                const mongod = await MongoMemoryServer.create()
                connectionString = mongod.getUri()
            }

            const client = new MongoClient(connectionString)
            await client.connect()

            database = client.db(process.env.DATABASE_NAME)
        } catch (error) {
            next(error)
        }
    }

    function close () {
        const client = new MongoClient(connectionString)
        client.close()
    }

    function getDatabase () {
        return database
    }

module.exports = {
    connect,
    close,
    getDatabase
}
