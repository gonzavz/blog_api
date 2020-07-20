'use strict';

const httpStatus = require('http-status');

const remove = async (req, res, next) => {
  const {post} = req.locals;
  try {
    await post.deleteOne();
    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
