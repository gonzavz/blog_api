'use strict';

const {Joi, Segments} = require('celebrate');

const create = {
  [Segments.BODY]: {
    username: Joi.string().required(),
    password: Joi.string().required(),
  },
};

module.exports = create;
