// const testingRouter = require('express').Router()
// const Note = require('../models/note')
// // const Blog = require('../models/blog')
// const User = require('../models/user')

// testingRouter.post('/reset', async (request, response) => {
//   await Note.deleteMany({})
//   // await Blog.deleteMany({})
//   await User.deleteMany({})

//   response.status(204).end()
// })

// module.exports = testingRouter

//Cypress test

const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Note.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router