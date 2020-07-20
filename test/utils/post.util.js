'use strict';

const {chance} = require('../index');

const generate = (attrs = {}) => {
  const defaultAttrs = {
    title: chance.sentence(),
    body: chance.paragraph(),
    tags: [chance.word()],
  };

  return Object.assign(defaultAttrs, attrs);
};

module.exports = {
  generate,
};
