'use strict';
const httpStatus = require('http-status');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const _ = require('lodash');
const {app, boot, request, cleanDB, chance, expect} = require('../../index');
const {postUtils, userUtils} = require('../../utils');
const PATH = '/posts';

describe(`GET ${PATH}`, () => {
  let Post;
  let posts;
  let user;
  before(async () => {
    await boot();
    await cleanDB();
    Post = mongoose.model('Post');
    user = await mongoose.model('User').create(userUtils.generate());
    posts = await Promise.mapSeries(
        chance.n(() => postUtils.generate(), 10),
        (post) => Post.create(post),
    );
  });
  after(async () => {
    await cleanDB();
  });
  it(`Should return ${httpStatus.OK} with posts`, async () => {
    const {body, status} = await request(app).get(PATH)
        .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(status).to.eql(httpStatus.OK);
    expect(body).to.be.an('object');
    expect(body).to.have.property('docs')
        .to.be.an('array')
        .that.has.lengthOf(posts.length);
    expect(body).to.have.property('totalDocs')
        .to.eql(posts.length);
    expect(body).to.have.property('limit')
        .to.eql(10);
    expect(body).to.have.property('offset')
        .to.eql(0);
  });
  it('Should limit the results', async () => {
    const limit = chance.integer({min: 1, max: posts.length});
    const {body, status} = await request(app)
        .get(PATH)
        .query({limit})
        .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(status).to.eql(httpStatus.OK);
    expect(body).to.be.an('object');
    expect(body).to.have.property('docs')
        .to.be.an('array')
        .that.has.lengthOf(limit);
    expect(body).to.have.property('totalDocs')
        .to.eql(posts.length);
    expect(body).to.have.property('limit')
        .to.eql(limit);
    expect(body).to.have.property('offset')
        .to.eql(0);
  });
  it('Should limit and offset the results', async () => {
    const offset = 3;
    const limit = 5;
    const {body, status} = await request(app)
        .get(PATH)
        .query({limit, offset})
        .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(status).to.eql(httpStatus.OK);
    expect(body).to.be.an('object');
    expect(body).to.have.property('docs')
        .to.be.an('array')
        .that.has.lengthOf(limit);
    // test ids to see we have the correct posts
    const expectedIds = _.map(_.slice(posts, offset, offset + limit), 'id');
    const receivedIds = _.map(body.docs, '_id');
    expect(expectedIds.length).to.eql(receivedIds.length);
    expect(_.difference(expectedIds, receivedIds)).to.have.lengthOf(0);
    // TODO: check actual values
    expect(body).to.have.property('totalDocs')
        .to.eql(posts.length);
    expect(body).to.have.property('limit')
        .to.eql(limit);
    expect(body).to.have.property('offset')
        .to.eql(offset);
  });
  it('Should sort the results', async () => {
    const sort = '-createdAt';
    const {body, status} = await request(app)
        .get(PATH)
        .query({sort})
        .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(status).to.eql(httpStatus.OK);
    expect(body).to.be.an('object');
    expect(body).to.have.property('docs')
        .to.be.an('array')
        .that.has.lengthOf(posts.length);
    // test ids to see we have the correct posts
    const expectedIds = _.map(_.reverse(posts), 'id');
    const receivedIds = _.map(body.docs, '_id');
    expect(expectedIds.length).to.eql(receivedIds.length);
    expect(_.difference(expectedIds, receivedIds)).to.have.lengthOf(0);
    // check order
    _.each(receivedIds, (postId, i) => expect(postId).eql(expectedIds[i], 'post is not sorted'));
    // TODO: check actual values
    expect(body).to.have.property('totalDocs')
        .to.eql(posts.length);
    expect(body).to.have.property('limit')
        .to.eql(10);
    expect(body).to.have.property('offset')
        .to.eql(0);
  });
});
