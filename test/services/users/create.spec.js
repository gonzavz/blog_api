'use strict';

const httpStatus = require('http-status');
const {app, request, boot, cleanDB, expect} = require('../../index');
const {userUtils} = require('../../utils');

const PATH = '/users';

describe(`POST ${PATH}`, () => {
  before(async () => {
    await boot();
    await cleanDB();
  });
  after(async () => {
    await cleanDB();
  });
  it(`Should create a user and return ${httpStatus.OK}`, async () => {
    const userData = userUtils.generate();
    const {body, status} = await request(app).post(PATH).send(userData);
    expect(status).to.eql(200);
    expect(body).to.be.an('object');
    expect(body).to.have.property('_id');
    expect(body).to.have.property('username')
        .to.eql(userData.username);
    expect(body).to.have.property('name')
        .to.eql(userData.name);
    expect(body).not.to.have.property('password');
  });
});
