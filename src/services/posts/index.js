'use strict';

const {Router} = require('express');
const {celebrate} = require('celebrate');
const {fetchPost} = require('./middlewares');
const {create, remove, list} = require('./handlers');
const {createSchema, removeSchema, listSchema} = require('./schemas');
const router = new Router({mergeParams: true});

router.post('/', celebrate(createSchema), create);
router.delete('/:postId', celebrate(removeSchema), fetchPost, remove);
router.get('/', celebrate(listSchema), list);
module.exports = router;
