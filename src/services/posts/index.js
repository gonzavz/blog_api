'use strict';

const {Router} = require('express');
const {create} = require('./handlers');
const router = new Router({mergeParams: true});

router.post('/', create);

module.exports = router;
