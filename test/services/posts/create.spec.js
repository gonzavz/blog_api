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
    expect(body).to.be.an('object');
    expect(status).to.eql(httpStatus.OK);
  });

  it(`Should return ${httpStatus.BAD_REQUEST} if title is to long`, async () => {
    const postToCreate = postUtils.generate({title: chance.word({length: postUtils.TITLE_MAX_LENGTH + 1})});
    const {body, status} = await request(app)
        .post(PATH)
        .send(postToCreate);
    expect(body).to.be.an('object');
    expect(status).to.eql(httpStatus.BAD_REQUEST);
  });

  it(`Should return ${httpStatus.BAD_REQUEST} if body is to long`, async () => {
    const postToCreate = postUtils.generate({body: chance.word({length: postUtils.BODY_MAX_LENGTH + 1})});
    const {body, status} = await request(app)
        .post(PATH)
        .send(postToCreate);
    expect(body).to.be.an('object');
    expect(status).to.eql(httpStatus.BAD_REQUEST);
  });

  it(`Should return ${httpStatus.BAD_REQUEST} if has to many tags`, async () => {
    const postToCreate = postUtils.generate({tags: chance.word({length: postUtils.BODY_MAX_LENGTH + 1})});
    const {body, status} = await request(app)
        .post(PATH)
        .send(postToCreate);
    expect(body).to.be.an('object');
    expect(status).to.eql(httpStatus.BAD_REQUEST);
  });

  it(`Should return ${httpStatus.BAD_REQUEST} if an invalid prop is sent`, async () => {
    const postToCreate = postUtils.generate();
    postToCreate[chance.guid()] = chance.guid();
    const {body, status} = await request(app)
        .post(PATH)
        .send(postToCreate);
    expect(body).to.be.an('object');
    console.log(body);
    expect(status).to.eql(httpStatus.BAD_REQUEST);
  });
});
