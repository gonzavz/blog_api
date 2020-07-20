'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {errors: celebrateErrors} = require('celebrate');
const {mongooseErrorHandler, httpErrorHandler} = require('../error-handlers');

const posts = require('./posts');
const users = require('./users');
const auth = require('./auth');
const {authenticate} = require('./common/middlewares');

const router = express.Router();
// locals
router.use((req, res, next) => {
  req.locals = {};
  res.locals = {};
  next();
});

// Configure body parser
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// Mount Services
router.get('/healthcheck', (req, res) => res.json({status: 'OK'}));
router.use('/posts', authenticate, posts);
router.use('/users', users);
router.use('/auth', auth);

router.use(mongooseErrorHandler);
router.use(celebrateErrors());
router.use(httpErrorHandler);

module.exports = router;
