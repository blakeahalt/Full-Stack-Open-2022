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

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete (returnedObject._id)
    delete (returnedObject.__v)
  }
})

module.exports = mongoose.model('User', userSchema)
