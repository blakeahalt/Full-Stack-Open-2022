const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })

  if (!password) {
    return response.status(400).json({
      error: 'missing password'
    })
  }
  else if (password.length < 3) {
    return response.status(400).json({
      error: 'password must be more than 3 characters'
    })
  }
  else if (!username) {
    return response.status(400).json({
      error: 'missing username'
    })
  }
  else if (username.length < 3) {
    return response.status(400).json({
      error: 'username must be more than 3 characters'
    })
  }
  else if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash,
  })

  const savedBlog = await user.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id:1 })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const users = await User.findById(request.params.id)
  if (users) {
    response.json(users)
  } else {
    response.status(404).end()
  }
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = usersRouter