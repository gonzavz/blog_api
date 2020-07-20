'use strict';

const {Router} = require('express');
const {celebrate} = require('celebrate');
const {create} = require('./handlers');
const {createSchema} = require('./schemas');
const router = new Router({mergeParams: true});

router.post('/', celebrate(createSchema), create);

module.exports = router;
