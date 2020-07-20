'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');

const create = async (req, res, next) => {
  const {body: userData} = req;
  try {
    const user = await mongoose.model('User').create(userData);
    res.json(_.omit(user.toJSON(), ['password']));
  } catch (error) {
    next(error);
  }
};

module.exports = create;
