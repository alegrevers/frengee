require('dotenv').config()
const express = require('express');
const vehicles = require('./routes/vehicles');
const port = process.env.PORT

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/vehicles', vehicles);

app.use((err, req, res, next) => {
  if (err instanceof Error) {
    console.error(`${err.name}: ${err.message}`);
    res.status(err.statusCode).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).send('An error occurred!');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
