require('dotenv').config()
const database = require('./utils/database-utils');

database.connect().then(() => {
  start();
}).catch(error => {
  console.error("Error connecting to the database:", error);
})

const app = require('./app')
const port = process.env.PORT
let server

function start () {
  server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

async function stop () {
  await server.close()
}

module.exports = stop
