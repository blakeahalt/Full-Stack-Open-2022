"use strict";

var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  // blogs: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Blog'
  //   }
  // ],
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  }]
});
userSchema.plugin(uniqueValidator);
userSchema.set('toJSON', {
  transform: function transform(document, returnedObject) {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v; // the passwordHash should not be revealed

    delete returnedObject.passwordHash;
  }
});
var User = mongoose.model('User', userSchema);
module.exports = User;