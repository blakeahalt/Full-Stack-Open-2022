"use strict";

// const mongoose = require('mongoose')
// const noteSchema = new mongoose.Schema({
//   content: {
//     type: String,
//     required: true,
//     minlength: 5
//   },
//   date: Date,
//   important: Boolean,
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }
// })
// noteSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })
// module.exports = mongoose.model('Note', noteSchema)
//Cypress test
var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});
noteSchema.set('toJSON', {
  transform: function transform(document, returnedObject) {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
module.exports = mongoose.model('Note', noteSchema);