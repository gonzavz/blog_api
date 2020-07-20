'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config');
const createHash = require('../utils/hash');
const {Schema} = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
  },
  password: {type: String, trim: true, required: true},
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

UserSchema.methods.generateToken = function() {
  const token = jwt.sign({sub: this.id}, jwtSecret);
  return token;
};

mongoose.model('User', UserSchema);
