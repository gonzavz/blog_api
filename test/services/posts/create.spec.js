'use strict';

const httpStatus = require('http-status');
const {app, boot, cleanDB, request, expect, chance} = require('../../index');
const {postUtils} = require('../../utils');
const PATH = '/posts';

describe(`POST ${PATH}`, () => {
  before(async () => {
    await boot();
    await cleanDB();
  });

  after(async () => {
    await cleanDB();
  });
  it(`Should create a post and return ${httpStatus.OK}`, async () => {
    const postToCreate = postUtils.generate();
    const {body, status} = await request(app)
        .post(PATH)
        .send(postToCreate);
    expect(status).to.eql(httpStatus.OK);
  });
});
