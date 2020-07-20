'use strict';

const app = require('../src/app');
const db = require('../src/db');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiAsPromised = require('chai-as-promised');
const {Chance} = require('chance');
const mongoose = require('mongoose');
const Promise = require('bluebird');

chai.use(chaiHttp);
chai.use(chaiAsPromised);

/**
 * Performs all the operations needed to bootstrap the application.
 *
 * @return {Promise} A promise that is fulfilled if all the operations
 * succeeded.
 * */
const boot = async () => {
  await db.connect();
};

/**
 * Removes all documents from every MongoDB collection.
 *
 * @return {Promise} A promise that is fulfilled if all documents from
 * all collections could be removed.
 * */
const cleanDB = async () => Promise.map(
    mongoose.modelNames(),
    async (modelName) => mongoose.model(modelName).deleteMany({}),
);

module.exports = {
  expect: chai.expect,
  request: chai.request,
  app,
  boot,
  cleanDB,
  chance: new Chance(),
};
