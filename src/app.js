require('dotenv').config()
const database = require('./utils/database-utils');
const port = process.env.PORT

async function start () {
  await database.connect()
  const express = require('express');
  const router = require('./routes/vehicles');

  var app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));


  app.use('/api/vehicles', router);

  app.use((err, req, res, next) => {
    if (err instanceof Error) {
      console.error(`${err.name}: ${err.message}`);
      res.status(err.statusCode).json({ error: err.message });
    } else {
      console.error(err);
      res.status(500).send('An error occurred!')
    }
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

start()
