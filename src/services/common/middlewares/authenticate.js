'use strict';

const jwt = require('jsonwebtoken');
const httpErrors = require('http-errors');
const mongoose = require('mongoose');
const {jwtSecret} = require('../../../config');

const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await mongoose.model('User').findById(decoded.sub);
    return user;
  } catch (error) {
    throw new httpErrors.Unauthorized('Invalid token');
  }
}

const authenticate = async (req, res, next) => {
  try {
    // Check the Authorization header was sent.
    const authorization = req.get('Authorization');
    if (!authorization) throw new httpErrors.Unauthorized('Missing authorization header');

    // Check the Authorization header has two parts.
    const authorizationParts = authorization.split(' ');
    if (authorizationParts.length !== 2) throw new httpErrors.Unauthorized('Invalid authorization header'); // eslint-disable-line max-len

    // Check that token type is Bearer and a token was sent.
    const [tokenType, token] = authorizationParts
    if (tokenType !== 'Bearer') throw new httpErrors.Unauthorized('Invalid token type');
    if (!token) throw new httpErrors.Unauthorized('Missing bearer token');
    const user = await verifyToken(token);
    if (!user) throw new httpErrors.Unauthorized('User not found');
    req.user = user;
    next();
  } catch (error) {
    console.log('AUTH ERROR', error);
    next(error);
  }
};

module.exports = authenticate;
