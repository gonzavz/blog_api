'use strict';

const {Joi, Segments} = require('celebrate');

const list = {
  [Segments.QUERY]: {
    limit: Joi.number().min(0).default(10),
    offset: Joi.number().min(0).default(0),
    sort: Joi.string().valid('-createdAt', 'createdAt'),
  },
};

module.exports = list;
