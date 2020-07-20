'use strict';

const mongoose = require('mongoose');
const createHash = require('../utils/hash');
const {Schema} = mongoose;

const UserSchema = new Schema({
  username: String,
  name: String,
  password: String,
}, {
  timestamps: true,
  collectionName: 'User',
});

/**
 * This is the middleware, It will be called before saving any record
 */
/* eslint-disable no-invalid-this */
UserSchema.pre('save', function(next) {
  // check if password is present and is modified.
  if (this.password && this.isModified('password')) {
    this.password = createHash(this.password);
  }
  next();
});
/* eslint-disable no-invalid-this */

mongoose.model('User', UserSchema);
