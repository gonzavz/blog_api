'use strict';

const mongooseErrorHandler = require('./mongooseErrorHandler');
const httpErrorHandler = require('./httpErrorHandler');
module.exports = {
  mongooseErrorHandler,
  httpErrorHandler,
};

