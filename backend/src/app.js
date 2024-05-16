const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Importando Rotas
const routes = require('./routes');
app.use('/api', routes);

module.exports = app;