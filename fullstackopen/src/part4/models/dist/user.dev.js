"use strict";

// const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator')
// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     unique: true,
//   },
//   name: String,
//   passwordHash: String,
//   notes: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Note'
//     }
//   ],
//   // blogs: [
//   //   {
//   //     type: mongoose.Schema.Types.ObjectId,
//   //     ref: 'Blog'
//   //   }
//   // ],
// })
// userSchema.plugin(uniqueValidator)
// userSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//     // the passwordHash should not be revealed
//     delete returnedObject.passwordHash
//   }
// })
// const User = mongoose.model('User', userSchema)
// module.exports = User
// // const userSchema = new mongoose.Schema({
// //   username: String,
// //   name: String,
// //   passwordHash: String,
// //   notes: [
// //     {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: 'Note'
// //     }
// //   ],
// // })
//Cypress test
var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: String,
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