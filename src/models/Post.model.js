'use strict';

const mongoose = require('mongoose');

const {Schema} = mongoose;

const PostSchema = new Schema({
  title: String,
  url: String,
  body: String,
  tags: [String],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
  collectionName: 'Post',
});

mongoose.model('Post', PostSchema);


