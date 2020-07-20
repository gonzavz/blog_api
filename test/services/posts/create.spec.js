'use strict';

const httpStatus = require('http-status');
const mongoose = require('mongoose');
const {app, boot, cleanDB, request, expect, chance} = require('../../index');
const {postUtils, userUtils} = require('../../utils');
const PATH = '/posts';

describe(`POST ${PATH}`, () => {
  let user;
  before(async () => {
    await boot();
    await cleanDB();
    user = await mongoose.model('User').create(userUtils.generate());
  });

  after(async () => {
    await cleanDB();
  });
  it(`Should create a post and return ${httpStatus.OK}`, async () => {
    const postToCreate = postUtils.generate();
    const {body, status} = await request(app)
        .post(PATH)
        .set('Authorization', `Bearer ${user.generateToken()}`)
        .send(postToCreate);
    expect(body).to.be.an('object');
    expect(status).to.eql(httpStatus.OK);
  });

  it(`Should return ${httpStatus.BAD_REQUEST} if title is to long`, async () => {
    const postToCreate = postUtils.generate({title: chance.word({length: postUtils.TITLE_MAX_LENGTH + 1})});
    const {body, status} = await request(app)
        .post(PATH)
        .set('Authorization', `Bearer ${user.generateToken()}`)
        .send(postToCreate);
    expect(body).to.be.an('object');
    expect(status).to.eql(httpStatus.BAD_REQUEST);
  });

  it(`Should return ${httpStatus.BAD_REQUEST} if body is to long`, async () => {
    const postToCreate = postUtils.generate({body: chance.word({length: postUtils.BODY_MAX_LENGTH + 1})});
    const {body, status} = await request(app)
        .post(PATH)
        .set('Authorization', `Bearer ${user.generateToken()}`)
        .send(postToCreate);
    expect(body).to.be.an('object');
    expect(status).to.eql(httpStatus.BAD_REQUEST);
  });

  it(`Should return ${httpStatus.BAD_REQUEST} if has to many tags`, async () => {
    const postToCreate = postUtils.generate({tags: chance.word({length: postUtils.BODY_MAX_LENGTH + 1})});
    const {body, status} = await request(app)
        .post(PATH)
        .set('Authorization', `Bearer ${user.generateToken()}`)
        .send(postToCreate);
    expect(body).to.be.an('object');
    expect(status).to.eql(httpStatus.BAD_REQUEST);
  });

  it(`Should return ${httpStatus.BAD_REQUEST} if an invalid prop is sent`, async () => {
    const postToCreate = postUtils.generate();
    postToCreate[chance.guid()] = chance.guid();
    const {body, status} = await request(app)
        .post(PATH)
        .set('Authorization', `Bearer ${user.generateToken()}`)
        .send(postToCreate);
    expect(body).to.be.an('object');
    expect(status).to.eql(httpStatus.BAD_REQUEST);
  });
});
