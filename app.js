const express = require('express');
const { getTreasures, getTreasuresById } = require('./controllers/treasures.controllers');

const app = express();

app.get('/api/treasures', getTreasures);
app.get('/api/treasures/:id', getTreasuresById)

// after the first test has been written - define the path, controller and model....
// console.log everything!!!

// we will, later on, need some other error handler for things like psql and custom errors
// BUT! we should only write these when we need them!

// extract this out to errors.controller
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'internal server error' });
});


module.exports = app;
