'use strict';

const {Segments} = require('celebrate');
const {objectId} = require('../../common/schemas');

const remove = {
  [Segments.PARAMS]: {postId: objectId().required()},
};

module.exports = remove;
