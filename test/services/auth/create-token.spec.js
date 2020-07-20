'use strict';

const httpStatus = require('http-status');
const mongoose = require('mongoose');
const {app, boot, request, cleanDB, expect} = require('../../index');
const {userUtils} = require('../../utils');
const PATH = '/auth/token';

describe(`POST ${PATH}`, () => {
  let userData;
  before(async () => {
    await boot();
    await cleanDB();
    userData = userUtils.generate();
    await mongoose.model('User').create(userData);
  });

  after(async () => {
    await cleanDB();
  });

  it(`Should return ${httpStatus.OK} and token with valid credentials`, async () => {
    const {status, body} = await request(app)
        .post(PATH).send({
          username: userData.username,
          password: userData.password,
        });
    expect(status).to.eql(httpStatus.OK);
    expect(body).to.be.an('object')
        .to.have.property('token');
  });

  it(`Should return ${httpStatus.UNAUTHORIZED} with invalid credentials`, async () => {
    const {status, body} = await request(app)
        .post(PATH).send({
          username: userData.username,
          password: 'not_a_password',
        });
    expect(status).to.eql(httpStatus.UNAUTHORIZED);
    expect(body).to.be.an('object')
        .to.have.property('message')
        .to.eql('bad username or password');
  });
});
