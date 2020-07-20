'use strict';

const {chance} = require('../index');

const generate = (attrs = {}) => {
  const defaultAttrs = {
    username: chance.email(),
    password: chance.word(),
    name: chance.name(),
  };

  return Object.assign(defaultAttrs, attrs);
};

module.exports = {generate};
