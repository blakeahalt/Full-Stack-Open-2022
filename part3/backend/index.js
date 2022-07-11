// const express = require('express')
// const morgan = require('morgan')
// const cors = require('cors')
// const app = express()

// app.use(express.static('build'))
// app.use(express.json())
// app.use(cors())

// const requestLogger = (request, response, next) => {
// 	console.log('Method:', request.method)
// 	console.log('Path:  ', request.path)
// 	console.log('Body:  ', request.body)
// 	console.log('---')
// 	next()
//   }

// app.use(requestLogger)

// morgan.token('body', req => 
// {
//   return JSON.stringify(req.body)
// })

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// let persons =[
//   { 
//     "id": 1,
//     "name": "Arto Hellas", 
//     "number": "040-123456"
//   },
//   { 
//     "id": 2,
//     "name": "Ada Lovelace", 
//     "number": "39-44-5323523"
//   },
//   { 
//     "id": 3,
//     "name": "Dan Abramov", 
//     "number": "12-43-234345"
//   },
//   { 
//     "id": 4,
//     "name": "Mary Poppendieck", 
//     "number": "39-23-6423122"
//   }
// ]

// const getRandomInt = (min, max) => {
// 	min = Math.ceil(1);
// 	max = Math.floor(100);
// 	return Math.floor(Math.random() * (max - min) + min); 
//   }

// const generateId =() => {
//   return getRandomInt()
// }

// app.post('/api/persons/', (request, response) => {
//   const body = request.body
//   const foundPerson = persons.find(person => person.name === body.name)

//   const person = {
//       id: generateId(),
//       name: body.name,
//       number: body.number,
//     }

//     if (foundPerson) {
//       return response.status(400).json({ 
//         error: 'That name already exists' 
//       })
//     } else if (!body.name && !body.number) {
//         return response.status(400).json({ 
//           error: 'No name or number' 
//         })
//     } else if (!body.number) {
//         return response.status(400).json({ 
//           error: 'No number' 
//         })
//     } else if (!body.name) {
//         return response.status(400).json({ 
//           error: 'No name' 
//         })
//     }

//     persons = persons.concat(person)
//     response.json(person)
    
//   })

// app.delete('/api/persons/:id/', (request, response) => {
//   const id = Number(request.params.id)
//   persons = persons.filter(person => person.id !== id)

//   response.status(204).end()
// })


// app.get('/api/persons/:id', (request, response) => {
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
// })

// app.get('/api/persons', (request, response) => {
//   const id = Number(request.params.id)

//     response.json(persons)
//   })


// app.get('/info', (request, response) => {
// 	// const infoData = {
// 	//   content: `Phonebook has info for ${persons.length} people.`,
// 	//   date: Date()

// 	const dateInfo = new Date()
// 	response.send(`<h2>Phonebook has info for ${persons.length} people</h2><h2>${dateInfo}</h2>`)
// 	response.json(infoData)
//   })


// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(unknownEndpoint)

// const PORT = process.env.PORT || 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

require('dotenv').config()
const express = require('express')
const app = express()
const User = require('./models/person')
const cors = require('cors')

// const morgan = require('morgan')

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

// morgan.token('body', req => 
// {
//   return JSON.stringify(req.body)
// })

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons =[
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
  const foundPerson = User.find(user => user.name === body.name)

  const user = new User ({
      id: generateId(),
      name: user.name,
      number: user.number,
    })

    if (foundPerson) {
      return response.status(400).json({ 
        error: 'That name already exists' 
      })
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

    // persons = persons.concat(person)
    // response.json(person)
    
    user.save().then(savedUser => {
      response.json(savedUser)
    })
  })

app.delete('/api/persons/:id/', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


app.get('/api/persons/:id', (request, response) => {
  // const id = Number(request.params.id)
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
  User.findById(request.params.id).then(user => {
    response.json(user)
    })
})

app.get('/api/persons', (request, response) => {
  // const id = Number(request.params.id)
  // response.json(persons)
  User.find({}).then(user => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
	const dateInfo = new Date()
	response.send(`<h2>Phonebook has info for ${persons.length} people</h2><h2>${dateInfo}</h2>`)
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