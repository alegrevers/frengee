const MongoClient = require("mongodb").MongoClient

const test = process.env.DATABASE_URI
const connectionString = process.env.DATABASE_URI
const client = new MongoClient(connectionString)

let conn
conn = client.connect()

async function database ()
{
    return conn.db(process.env.DATABASE_NAME)
}

module.exports = database
