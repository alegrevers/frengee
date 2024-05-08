const MongoClient = require("mongodb").MongoClient
const { MongoMemoryServer } = require('mongodb-memory-server');
let connectionString = process.env.DATABASE_URI
let database
let dbPromise;

    async function connect() {
        // try {
            if (process.env.NODE_ENV === 'test') {
                const mongod = await MongoMemoryServer.create()
                connectionString = mongod.getUri()
            }

            const client = new MongoClient(connectionString)
            client.connect()

            // database = client.db('admin')
            database = client.db(process.env.DATABASE_NAME)
            // console.log('🚀 ~ database:', database)
        // } catch (error) {
        //     next(error)
        // }
    }

    function close () {
        const client = new MongoClient(connectionString)
        client.close()
    }

    async function getDatabase() {
        if (!dbPromise) {
            dbPromise = connect();
        }

        await dbPromise;
        return database;
    }

    // async function getDatabase () {
    //     console.log('🚀 ~ database:', database)
    //     return database
    // }

module.exports = {
    connect,
    close,
    getDatabase
}
