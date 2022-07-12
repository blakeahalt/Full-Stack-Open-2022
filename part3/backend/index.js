require('dotenv').config()
const express = require('express')
const app = express()
const User = require('./models/person')
const cors = require('cors')

const morgan = require('morgan')
const { user } = require('pg/lib/defaults')

// const requestLogger = (request, response, next) => {
// 	console.log('Method:', request.method)
// 	console.log('Path:  ', request.path)
// 	console.log('Body:  ', request.body)
// 	console.log('---')
// 	next()
//   }

app.use(express.json())
// app.use(requestLogger)
app.use(cors())
app.use(express.static('build'))

morgan.token('body', req => 
{
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let users =[
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  },
  { 
    "id": 6,
    "name": "Blake", 
    "number": "508-299-9373"
  }
]

// const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
// const url = `mongodb+srv://blakeahalt:${password}@cluster0.nrpgtan.mongodb.net/Person?retryWrites=true&w=majority`

// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

// const userSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// })

// const User = mongoose.model('User', userSchema)

// userSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

const getRandomInt = (min, max) => {
	min = Math.ceil(1);
	max = Math.floor(100);
	return Math.floor(Math.random() * (max - min) + min); 
  }

const generateId =() => {
  return getRandomInt()
}

app.post('/api/persons/', (request, response) => {
  const body = request.body

  // if (body.name && body.number === undefined) {
  //   return response.status(400).json({ error: 'content missing' })
  // }

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
      // let res = window.confirm(`${newName} already exists. To update a new number, click to confirm.`)
      // if (res) {
      //   noteService
      //   .update(isFound.id, newPerson)
      //   .then(updatedPerson => {
      //     setPersons(persons.map(person => person.id ? person : updatedPerson))
      //     setMessage(
      //       {message:`Successfully updated ${newName}'s number!`,
      //       type: "success"})
      //     })
      //   }
    } else if (!body.name && !body.number) {
        return response.status(400).json({ 
          error: 'No name or number' 
        })
    } else if (!body.number) {
        return response.status(400).json({ 
          error: 'No number' 
        })
    } else if (!body.name) {
        return response.status(400).json({ 
          error: 'No name' 
        })
    }

    users = users.concat(user)
    // response.json(person)
    
    user.save().then(users => {
      response.json(users)
    })
  })

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const user = {
    _id: generateId(),
    name: body.name,
    number: body.number,
  }

  User.findByIdAndUpdate(request.params.id, user, { new: true })
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

app.get('/api/persons', (request, response) => {
  // const id = Number(request.params.id)
  // response.json(persons)
  User.find({}).then(user => {
    response.json(user)
  })
})

app.get('/info', (request, response) => {
	const dateInfo = new Date()
	response.send(`<h2>Phonebook has info for ${user.length} people</h2><h2>${dateInfo}</h2>`)
	// response.json(info)
  })


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})