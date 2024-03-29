const app = require('./App')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

// const http = require('http')
// const express = require('express')
// const app = express()
// const config = require("./utils/config");

// const cors = require('cors')
// const mongoose = require('mongoose')

// const Blog = require('./models/blogs')

// const mongoUrl = 'mongodb://localhost/bloglist'
// mongoose.connect(mongoUrl)

// app.use(cors())
// app.use(express.json())
// app.use(express.static('build'))

// // const Blog = mongoose.model('Blog', blogSchema)

// app.get('/api/blogs', (request, response) => {
//   Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
// })

// app.post('/api/blogs', (request, response) => {
//   const blog = new Blog(request.body)

//   blog
//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })
// })

// const server = http.createServer(app)

// server.listen(config.PORT, () => {
//   logger.info(`Server running on port ${config.PORT}`)
// })


