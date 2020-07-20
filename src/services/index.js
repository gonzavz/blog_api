'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const posts = require('./posts');

const router = express.Router();

// Configure body parser
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// Mount Services
router.get('/healthcheck', (req, res) => res.json({status: 'OK'}));
router.use('/posts', posts);

module.exports = router;
