const express = require('express');
const router = require('./routes/vehicles');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
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

module.exports = app
