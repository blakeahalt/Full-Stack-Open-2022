// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }
require('dotenv').config()
const express = require('express')
// const mongoose = require('mongoose')
// const url = process.env.MONGODB_URI
// mongoose.set('strictQuery', true)
// mongoose.connect(url)
const app = express()
const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));
// console.log((path.join(__dirname, '../build')))

app.use(express.json())
const User = require('./models/person')
const cors = require('cors')
app.use(cors())

// const mongoose = require('mongoose')
// // import mongoose from 'mongoose';
// mongoose.set('strictQuery', true)
// const url = process.env.MONGODB_URI

// console.log('connecting...')

// mongoose.connect(url)
//   .then(result => {
//     console.log('connected to MongoDB')
//   })
//   .catch((error) => {
//     console.log('error connecting to MongoDB:', error.message)
//   })

// const userSchema = new mongoose.Schema({
//   _id: String,
//   name: String,
//   number: String,
// })

// userSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete (returnedObject._id)
//     delete (returnedObject.__v)
//   }
// })

// const User = mongoose.model('User', userSchema)



const getRandomInt = (min, max) => {
  min = Math.ceil(1)
  max = Math.floor(1000)
  return Math.floor(Math.random() * (max - min) + min)
}

const generateId = () => {
  return getRandomInt()
}

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, '../build'));
//   // res.sendFile('/Users/blakeahalt/Documents/GitHub/Full-Stack-Open-2022/fullstackopen/src/part3/frontend/build/index.html');
// });

app.get('/api/persons', (request, response) => {
  User.find({}).then(user => {
    response.json(user)
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name === undefined && body.number === undefined) {
    return response.status(400).json({ error: 'name and number missing' })
  }
  else if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }
  else if (body.number === undefined) {
    return response.status(400).json({ error: 'number missing' })
  }

  const user = new User({
    _id: generateId(),
    name: body.name,
    number: body.number,
  })

  // app.get('/api/persons', (req, res) => {
  //   res.json(users)
  // })

  // const foundPerson = users.find(user => user.name === body.name)

  // if (foundPerson) {
  //   return response.status(400).json({
  //     error: 'That name already exists'
  //   })
  // } else if (body.name.length < 3) {
  //   return response.status(400).json({
  //     error: 'Name must have at least 3 letters.'
  //   })
  // } else if (body.number.length < 8) {
  //   return response.status(400).json({
  //     error: 'Number must be at least 8 digits.'
  //   })
  // } else if (!body.name && !body.number) {
  //   return response.status(400).json({
  //     error: 'No name or number'
  //   })
  // } else if (body.number === undefined || !body.number) {
  //   return response.status(400).json({
  //     error: 'No number'
  //   })
  // } else if (body.name === undefined || !body.name) {
  //   return response.status(400).json({
  //     error: 'No name'
  //   })
  // }

  // users = users.concat(user)
  // response.json(person)

  user.save().then(users => {
    response.json(users)
  })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  User.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' })
    .then(updatedUser => {
      response.json(updatedUser)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // persons = persons.filter(person => person.id !== id)

  // response.status(204).end()
  User.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))

})


app.get('/api/persons/:id', (request, response, next) => {
  //   const id = Number(request.params.id)
  //   const body = persons.find(person => person.id === id)

  //   if (body) {
  //     response.json(body)
  //     morgan.token('body', req =>
  // {
  //   return JSON.stringify(req.body)
  // })
  //   } else {
  //     return (
  //       response.send("HTTP Error 404: Not Found"),
  //       response.status(404).end()
  //       )
  //   }
  User.findById(request.params.id)
    .then(user => {
      if (user) {
        response.json(user)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.get('/info', (request, response) => {
  const dateInfo = new Date()
  User.find({}).then(users => {
    response.send(`<h2>Phonebook has info for ${users.length} people</h2><h2>${dateInfo}</h2>`)
  })
  // response.json(info)
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 8080 || 3001
// app.listen(PORT, "0.0.0.0")
app.listen(PORT, () => {
  console.log('Server running on port 3001')
})