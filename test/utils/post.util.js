'use strict';

const {chance} = require('../index');
const {
  TAG_MAX_LENGTH,
  TAGS_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  BODY_MAX_LENGTH,
} = require('../../src/models/Post.constants');

const generateTag = () => chance
    .sentence({words: chance.integer({min: 1, max: 3})})
    .substring(0, TAG_MAX_LENGTH - 1);

const generateTitle = () => chance
    .sentence({words: chance.integer({min: 1, max: 30})})
    .substring(0, TITLE_MAX_LENGTH - 1);

const generateBody = () => chance
    .paragraph({sentences: chance.integer({min: 1, max: 30})})
    .substring(0, BODY_MAX_LENGTH - 1);

const generate = (attrs = {}) => {
  const defaultAttrs = {
    title: generateTitle(),
    body: generateBody(),
    tags: chance.n(() => generateTag(), chance.integer({min: 0, max: TAGS_MAX_LENGTH})),
  };

  return Object.assign(defaultAttrs, attrs);
};

module.exports = {
  generate,
  TAGS_MAX_LENGTH,
  TAG_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  BODY_MAX_LENGTH,
};
