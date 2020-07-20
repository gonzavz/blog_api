'use strict';

const mongoose = require('mongoose');

const {BODY_MAX_LENGTH, TITLE_MAX_LENGTH, TAG_MAX_LENGTH, TAGS_MAX_LENGTH} = require('./Post.constants');
const {Schema} = mongoose;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [TITLE_MAX_LENGTH, 'title can have at most {MAXLENGTH} chars.'],
  },
  body: {
    type: String,
    required: true,
    trim: true,
    maxlength: [BODY_MAX_LENGTH, 'body can have at most {MAXLENGTH} chars.'],
  },
  tags: {
    type: [{
      type: String,
      trim: true,
      maxlength: [TAG_MAX_LENGTH, 'tag can have at most {MAXLENGTH} chars.'],
    }],
    validate: [{
      validator(value) {
        return value.length < TAGS_MAX_LENGTH;
      },
      msg: 'Post can have at most 20 tags',
    }],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
  collectionName: 'Post',
});

mongoose.model('Post', PostSchema);


