"use strict";

var config = require('./utils/config');

var express = require('express');

require('express-async-errors');

var app = express();

var cors = require('cors');

var blogsRouter = require('./controllers/blogs');

var notesRouter = require('./controllers/notes');

var usersRouter = require('./controllers/users');

var loginRouter = require('./controllers/login');

var middleware = require('./utils/middleware');

var logger = require('./utils/logger');

var mongoose = require('mongoose');

var _require = require('./utils/middleware'),
    unknownEndpoint = _require.unknownEndpoint,
    errorHandler = _require.errorHandler,
    tokenExtractor = _require.tokenExtractor;

logger.info('connecting to', config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI).then(function () {
  logger.info('connected to MongoDB');
})["catch"](function (error) {
  logger.error('error connecting to MongoDB:', error.message);
});
app.use(cors());
app.use(express["static"]('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use('/api/blogs', blogsRouter); // app.use('/api/blogs', userExtractor, blogsRouter)

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(unknownEndpoint);
app.use(errorHandler);
module.exports = app;