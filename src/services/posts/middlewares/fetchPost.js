'use strict';

const createError = require('http-errors');
const mongoose = require('mongoose');

const fetchPost = async (req, res, next) => {
  const {postId} = req.params;
  try {
    const post = await mongoose.model('Post').findById(postId);
    if (!post) throw new createError.NotFound(`Post ${postId} not found.`);
    req.locals.post = post;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = fetchPost;
