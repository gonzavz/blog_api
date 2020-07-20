'use strict';

const {
  NODE_ENV, PORT, MONGODB_URI, MONGOOSE_AUTOINDEX
} = process.env;

module.exports = {
  env: NODE_ENV || 'development',
  port: PORT || 3000,
  mongodbUri: MONGODB_URI,
  mongooseAutoIndex: MONGOOSE_AUTOINDEX === ' true',
};
