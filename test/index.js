'use strict';

const app = require('../src/app');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);


module.exports = {
  expect: chai.expect,
  request: chai.request,
  app,
};
