'use strict';

const {expect} = require('../index');
const {
  TAGS_MAX_LENGTH, TAG_MAX_LENGTH, BODY_MAX_LENGTH, TITLE_MAX_LENGTH,
} = require('../../src/models/Post.constants');

describe('Model: Post', () => {
  it('-> constants', () => {
    expect(TAG_MAX_LENGTH).to.eql(100, 'TAG_MAX_LENGTH must be 100');
    expect(TAGS_MAX_LENGTH).to.eql(20, 'TAGS_MAX_LENGTH must be 20');
    expect(BODY_MAX_LENGTH).to.eql(3000, 'BODY_MAX_LENGTH must be 3000');
    expect(TITLE_MAX_LENGTH).to.eql(200, 'TITLE_MAX_LENGTH must be 200');
  });
});
