'use strict';
const _ = require('lodash');
const {
  NODE_ENV, PORT, MONGODB_URI, MONGOOSE_AUTOINDEX, JWT_SECRET,
} = process.env;

module.exports = {
  env: _.defaultTo(NODE_ENV, 'development'),
  port: _.defaultTo(PORT, 3000),
  mongodbUri: MONGODB_URI,
  mongooseAutoIndex: MONGOOSE_AUTOINDEX === ' true',
  jwtSecret: _.defaultTo(JWT_SECRET, 'mysecret'),
};
