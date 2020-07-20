'use strict';

const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema({
  username: String,
  name: String,
  password: String,
}, {
  timestamps: true,
  collectionName: 'User',
});

mongoose.model('User', UserSchema);
