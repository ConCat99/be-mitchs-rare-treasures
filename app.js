const express = require('express');
const {
	getTreasures,
	getTreasuresById,
	getTreasuresSortby,
} = require('./controllers/treasures.controllers');
const {
	logServerError,
	logPsqlError,
	logCustomError,
} = require('./controllers/errors.controllers');

const app = express();

app.get('/api/treasures', getTreasures);

app.get('/api/treasures/:id', getTreasuresById);

app.use(logPsqlError);

app.use(logCustomError);

app.use(logServerError);

module.exports = app;
