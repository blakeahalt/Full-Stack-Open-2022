const config = require('./utils/config')
const express = require('express')
// require("express-async-errors")
const app = express()
const cors = require('cors')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')
const notesRouter = require('./controllers/notes')

// const usersRouter = require("./controllers/users")
// const loginRouter = require("./controllers/login")

logger.info('connecting...')
// logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  // {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
// })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

// app.use(middleware.morganLogger());
// app.use(middleware.tokenExtractor);

app.use('/api/blogs', blogsRouter)
app.use('/api/notes', notesRouter)
// app.use("/api/login", loginRouter);
// app.use("/api/users", usersRouter);

// if (process.env.NODE_ENV === 'test') {
//   const testingRouter = require('./controllers/testing')
//   app.use('/api/testing', testingRouter)
// }

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app