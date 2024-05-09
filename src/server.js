require('dotenv').config()
const database = require('./utils/database-utils');

database.connect().then(() => {
  server;
}).catch(error => {
  console.error("Error connecting to the database:", error);
})

const app = require('./app')
const port = process.env.PORT

  const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

async function stop () {
  server.close()
}

module.exports = stop
