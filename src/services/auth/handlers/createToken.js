'use strict';
const mongoose = require('mongoose');
const httpErrors = require('http-errors');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../../../config');
const createHash = require('../../../utils/hash');

const createToken = async (req, res, next) => {
  const {body: credentials} = req;
  try {
    const User = mongoose.model('User');
    const user = await User.findOne({
      username: credentials.username,
      password: createHash(credentials.password),
    });
    if (!user) throw new httpErrors.Unauthorized('bad username or password');
    const token = user.generateToken();
    res.json({token});
  } catch (error) {
    next(error);
  }
};

module.exports = createToken;
