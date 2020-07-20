'use strict';

const {Joi, Segments} = require('celebrate');

const create = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
  }),
};

module.exports = create;
