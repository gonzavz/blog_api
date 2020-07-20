'use strict';
const mongoose = require('mongoose');

const list = async (req, res, next) => {
  const {limit = 10, offset = 0, sort} = req.query;
  try {
    const query = {};
    const options = {
      limit,
      sort: {createdAt: sort === '-createdAt' ? -1 : 1},
      offset,
    };
    const result = await mongoose.model('Post').paginate(query, options);
    res.json({
      docs: result.docs,
      totalDocs: result.totalDocs,
      limit: result.limit,
      offset: result.offset,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = list;
