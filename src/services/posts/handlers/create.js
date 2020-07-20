'use strict';

const mongoose = require('mongoose');

const create = async (req, res, next) => {
  const {body: postData} = req;
  try {
    const post = await mongoose.model('Post').create(postData);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

module.exports = create;

