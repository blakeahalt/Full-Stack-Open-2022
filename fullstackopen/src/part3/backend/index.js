// require('dotenv').config({ path: './.env' })
require('dotenv').config()
const express = require('express')
const app = express()
// const mongoose = require('mongoose')
// mongoose.set('strictQuery', true)

// app.use(express.static('build'))

// const fs = require('fs');
// const path = require('path');
// const indexPath = path.join(__dirname, 'index.js');
//   console.log(fs.realpathSync(indexPath));

const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));

app.use(express.json())
const User = require('./models/person')
const cors = require('cors')
app.use(cors())
// const morgan = require('morgan')

// // const { user } = require('pg/lib/defaults')

// const requestLogger = (request, response, next) => {
// 	console.log('Method:', request.method)
// 	console.log('Path:  ', request.path)
// 	console.log('Body:  ', request.body)
// 	console.log('---')
// 	next()
//   }

// app.use(requestLogger)

// morgan.token('body', req => {
//   return JSON.stringify(req.body)
// })

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let users = [
  {
    'name': 'Barbara',
    'number': '508-757-4523',
    'id': '79'
  },
  {
    'name': 'William',
    'number': '508-894-5974',
    'id': '45'
  },
  {
    'name': 'Cyrus',
    'number': '415-422-5332',
    'id': '78'
  },
  {
    'name': 'Katie',
    'number': '508-890-5320',
    'id': '12'
  },
  {
    'name': 'Tim',
    'number': '508-299-9373',
    'id': '86'
  }
]


// // DO NOT SAVE YOUR PASSWORD TO GITHUB!!
// const url = `mongodb+srv://blakeahalt:${password}@cluster0.nrpgtan.mongodb.net/Person?retryWrites=true&w=majority`

// const mongoose = require('mongoose')
// // // import mongoose from 'mongoose';
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

// // const userSchema = new mongoose.Schema({
// //   _id: {
// //     type: String
// //   },
// //   name: {
// //     type: String,
// //     minLength: [3, 'Minimum allowed name length is 3'],
// //     required: true
// //   },
// //   number: {
// //     type: String,
// //     minLength: [8, 'Please include at least 8 digits'],
// //     required: true,
// //     validate: {
// //       validator: function(v) {
// //         // return /^\s*\d{2,3}-\d{7,8}\s*$/.test(v)
// //         return /^\d{2,3}-\d+$/.test(v)
// //       },
// //       message: '12-1234567 or 12-12345678 or 123-123-4567 or 123-123-4567 are acceptable'
// //     }
// //   }
// // })

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

// app.get('/', (req, res) => {
//   // eslint-disable-next-line
//   res.send(build / index.html)
// })
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   // res.sendFile('/Users/blakeahalt/Documents/GitHub/Full-Stack-Open-2022/fullstackopen/src/part3/frontend/build/index.html');
// });




app.get('/api/persons', (request, response) => {
  // const id = Number(request.params.id)
  // response.json(persons)
  User.find({}).then(user => {
    response.json(user)
  })
})

// http://localhost:3001/api/persons
// app.post('/api/persons', (request, response, next) => {
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name === undefined) {
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



  const foundPerson = users.find(user => user.name === body.name)

  if (foundPerson) {
    return response.status(400).json({
      error: 'That name already exists'
    })
  } else if (body.name.length < 3) {
    return response.status(400).json({
      error: 'Name must have at least 3 letters.'
    })
  } else if (body.number.length < 8) {
    return response.status(400).json({
      error: 'Number must be at least 8 digits.'
    })
  } else if (!body.name && !body.number) {
    return response.status(400).json({
      error: 'No name or number'
    })
  } else if (body.number === undefined || !body.number) {
    return response.status(400).json({
      error: 'No number'
    })
  } else if (body.name === undefined || !body.name) {
    return response.status(400).json({
      error: 'No name'
    })
  }

  users = users.concat(user)
  // response.json(person)

  user.save().then(users => {
    response.json(users)
  })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  // const {name, number} = request.body

  // const user = {
  //   id: generateId(),
  //   name: body.name,
  //   number: body.number,
  // }

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

// const PORT = process.env.PORT
// app.listen(PORT, "0.0.0.0")

// const PORT = process.env.PORT || 3001 || 8080
app.listen(3001 || "0.0.0.0", () => {
  console.log(`Server running on port`)
})

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server running on port ${PORT}`)
// })

// const start = async () => {
//   try {
//     await app.listen(PORT, "0.0.0.0")
//     app.console.log(`server listening on ${PORT}`)
//   } catch (err) {
//     app.console.log(err)
//     // process.exit(1)
//   }
// }
// start()