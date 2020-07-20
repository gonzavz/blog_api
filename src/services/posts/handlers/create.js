'use strict';

const mongoose = require('mongoose');

const create = async (req, res, next) => {
  const {body: postData, user} = req;
  try {
    const post = await mongoose.model('Post').create({
      ...postData,
      author: user._id,
    });
    res.json(post);
  } catch (error) {
    next(error);
  }
};

module.exports = create;

