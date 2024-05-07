require('dotenv').config()
const express = require('express');
const vehicles = require('./routes/vehicles');
const port = process.env.PORT

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/vehicles', vehicles);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
