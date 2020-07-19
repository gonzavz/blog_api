'use strict';

const express = require('express');
const services = require('./services');

const app = express();

app.use('/', services);

module.exports = app;
