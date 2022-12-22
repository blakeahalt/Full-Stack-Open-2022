const mongoose = require('mongoose')
// import mongoose from 'mongoose';
mongoose.set('strictQuery', true)
const url = process.env.MONGODB_URI



console.log('connecting...')

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  number: String,
})

// const userSchema = new mongoose.Schema({
//   id: {
//     type: String
//   },
//   name: {
//     type: String,
//     minLength: [3, 'Minimum allowed name length is 3'],
//     required: true
//   },
//   number: {
//     type: String,
//     minLength: [8, 'Please include at least 8 digits'],
//     required: true,
//     validate: {
//       validator: function(v) {
//         return /^\s*\d{2,3}-\d{7,8}\s*$/.test(v)
//       },
//       message: '12-1234567 or 12-12345678 or 123-123-4567 or 123-123-4567 are acceptable'
//     }
//   }
// })

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete (returnedObject._id)
    delete (returnedObject.__v)
  }
})

module.exports = mongoose.model('User', userSchema)
