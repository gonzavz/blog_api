'use strict';

const mongoose = require('mongoose');
const {
  mongodbUri,
  mongooseAutoIndex,
} = require('./config');

// Load all models
require('require-all')({
  dirname: `${__dirname}/models`,
  filter: /\.model\.js$/,
});

/**
 * Connect to MongoDB.
 *
 * @param {Object} opts: Options for this connection.
 *
 * @return {Promise} A promise that resolves to the mongoose
 * default connection if the connection could be established.
 * Otherwise it will be rejected with the appropriate error.
 * */
const connect = async (opts = {}) => {
  const defaultOpts = {
    autoIndex: mongooseAutoIndex,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };

  const options = Object.assign(defaultOpts, opts);

  await mongoose.connect(mongodbUri, options);

  return mongoose.connection;
};

module.exports = {connect};
