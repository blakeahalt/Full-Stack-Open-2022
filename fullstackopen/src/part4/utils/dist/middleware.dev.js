"use strict";

var logger = require('./logger');

var jwt = require('jsonwebtoken');

var User = require('../models/user');

var requestLogger = function requestLogger(request, response, next) {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

var unknownEndpoint = function unknownEndpoint(request, response) {
  response.status(404).send({
    error: 'unknown endpoint'
  });
};

var errorHandler = function errorHandler(error, request, response, next) {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    });
  }

  next(error);
}; // const userExtractor = async (request, response, next) => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)
//     if (decodedToken) {
//       request.user = await User.findById(decodedToken.id)
//     }
//   }
//   next()
// }


var tokenExtractor = function tokenExtractor(request, response, next) {
  var authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
    next();
  } else {
    next();
  }
};

module.exports = {
  requestLogger: requestLogger,
  unknownEndpoint: unknownEndpoint,
  errorHandler: errorHandler,
  tokenExtractor: tokenExtractor // userExtractor,

};