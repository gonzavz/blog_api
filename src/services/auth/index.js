'use strict';

const {Router} = require('express');
const {celebrate} = require('celebrate');
const {createToken} = require('./handlers');
const {createSchema} = require('./schemas');
const router = new Router({mergeParams: true});

router.post('/token', celebrate(createSchema), createToken);

module.exports = router;
