"use strict";

var mongoose = require('mongoose');

mongoose.set('strictQuery', true);
var url = process.env.MONGODB_URI;
console.log('connecting...');
mongoose.connect(url).then(function (result) {
  console.log('connected to MongoDB');
})["catch"](function (error) {
  console.log('error connecting to MongoDB:', error.message);
}); // const userSchema = new mongoose.Schema({
//   _id: String,
//   name: String,
//   number: String,
// })

var userSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  name: {
    type: String,
    minLength: [3, 'Minimum allowed name length is 3'],
    required: true
  },
  number: {
    type: String,
    minLength: [8, 'Please include at least 8 digits'],
    required: true,
    validate: {
      validator: function validator(v) {
        return /^\d{3}-\d{3}-\d{4}$|^\d{2}-\d{7}$|^\d{2}-\d{8}$|^\d{3}\d{3}-\d{4}$|^\d{2}\d{7}$|^\d{2}\d{8}$/.test(v);
      },
      message: '12-1234567 or 12-12345678 or 123-123-1234 are acceptable'
    }
  }
});
userSchema.set('toJSON', {
  transform: function transform(document, returnedObject) {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
module.exports = mongoose.model('User', userSchema);