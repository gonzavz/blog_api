'use strict';
const {app, request, expect, boot, cleanDB, chance} = require('../../index');
const {postUtils} = require('../../utils');
const httpStatus = require('http-status');
const mongoose = require('mongoose');

const PATH = '/post/:postId';
describe(`DELETE ${PATH}`, () => {
  const buildPath = (postId) => `/posts/${postId}`;
  before(async () => {
    await boot();
    await cleanDB();
  });
  after(async () => {
    await cleanDB();
  });

  it('Should remove the post', async () => {
    const postToRemove = await mongoose.model('Post').create(postUtils.generate());
    const path = buildPath(postToRemove.id);
    const {status} = await request(app).delete(path);
    expect(status).to.eql(httpStatus.NO_CONTENT);
    // check post was successfully removed
    const post = await mongoose.model('Post').findById(postToRemove.id);
    expect(post).to.be.null;
  });

  it(`Should return ${httpStatus.NOT_FOUND} if post dont exists`, async () => {
    const unknownPostId = mongoose.Types.ObjectId();
    const path = buildPath(unknownPostId);
    const {status, body} = await request(app).delete(path);
    expect(status).to.eql(httpStatus.NOT_FOUND);
    expect(body).to.be.an('object')
        .to.have.property('message')
        .to.eql(`Post ${unknownPostId} not found.`);
  });
  it(`Should return ${httpStatus.BAD_REQUEST} with invalid postId`, async () => {
    const invalidPostId = chance.word({length: 10});
    const path = buildPath(invalidPostId);
    const {status, body} = await request(app).delete(path);
    expect(status).to.eql(httpStatus.BAD_REQUEST);
    expect(body).to.be.an('object')
        .to.have.property('message')
        .to.eql(`"postId" with value "${invalidPostId}" fails to match the required pattern: /^[a-f0-9]{24}$/`);
  });
})