const jwt = require('jsonwebtoken')
const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

notesRouter.get('/', async (request, response) => {
  // Note.find({}).then(notes => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })

  response.json(notes)
  // })
})

notesRouter.get('/:id', async (request, response) => {
  // try {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
  // } catch(exception) {
  //   next(exception)
  // }
})
//   Note.findById(request.params.id)
//     .then(note => {
//       if (note) {
//         response.json(note)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => next(error))
// })

notesRouter.post('/', async (request, response) => {
  const body = request.body
  // const token = getTokenFrom(request)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    date: new Date(),
    user: user._id
  })

  const savedNote = await note.save()
  await user.save()
  response.status(201).json(savedNote)

  // const body = request.body

  // const user = await User.findById(body.userId)

  // const note = new Note({
  //   content: body.content,
  //   important: body.important === undefined ? false : body.important,
  //   date: new Date(),
  //   user: user._id
  // })

  // const savedNote = await note.save()
  // user.notes = user.notes.concat(savedNote._id)
  // await user.save()

  // response.json(savedNote)

  // using 'express-async-errors' the two lines above replace the try-catch block
  // try {
  //   const savedNote = await note.save()
  //   response.status(201).json(savedNote)
  // } catch(exception) {
  //   next(exception)
  // }

  // note.save()
  //   .then(savedNote => {
  //     response.status(201).json(savedNote)
  //   })
  //   .catch(error => next(error))
})

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
  // using 'express-async-errors' the two lines above replace the try-catch block

  // try {
  //   await Note.findByIdAndRemove(request.params.id)
  //   response.status(204).end()
  // } catch(exception) {
  //   next(exception)
  // }

})
//   Note.findByIdAndRemove(request.params.id)
//     .then(() => {
//       response.status(204).end()
//     })
//     .catch(error => next(error))
// })

notesRouter.put('/:id', async (request, response) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  await Note.findByIdAndUpdate(request.params.id, note, { new:true })
  response.status(204).end()
  // Note.findByIdAndUpdate(request.params.id, note, { new: true })
  //   .then(updatedNote => {
  //     response.json(updatedNote)
  //   })
  //   .catch(error => next(error))
})

module.exports = notesRouter