"use strict";

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }
require('dotenv').config();

var express = require('express'); // const mongoose = require('mongoose')
// const url = process.env.MONGODB_URI
// mongoose.set('strictQuery', true)
// mongoose.connect(url)


var app = express();

var path = require('path');

app.use(express["static"](path.join(__dirname, '../build'))); // console.log((path.join(__dirname, '../build')))

app.use(express.json());

var User = require('./models/person');

var cors = require('cors');

app.use(cors()); // const mongoose = require('mongoose')
// // import mongoose from 'mongoose';
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
// userSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete (returnedObject._id)
//     delete (returnedObject.__v)
//   }
// })
// const User = mongoose.model('User', userSchema)

var getRandomInt = function getRandomInt(min, max) {
  min = Math.ceil(1);
  max = Math.floor(1000);
  return Math.floor(Math.random() * (max - min) + min);
};

var generateId = function generateId() {
  return getRandomInt();
};

app.get('/api/persons', function (request, response) {
  User.find({}).then(function (user) {
    response.json(user);
  });
});
app.post('/api/persons', function (request, response, next) {
  var body = request.body;

  if (body.name === undefined && body.number === undefined) {
    return response.status(400).json({
      error: 'name and number missing'
    });
  } else if (body.name === undefined) {
    return response.status(400).json({
      error: 'name missing'
    });
  } else if (body.number === undefined) {
    return response.status(400).json({
      error: 'number missing'
    });
  }

  var user = new User({
    _id: generateId(),
    name: body.name,
    number: body.number
  });
  user.save().then(function (users) {
    response.json(users);
  })["catch"](function (error) {
    return next(error);
  });
});
app.put('/api/persons/:id', function (request, response, next) {
  var _request$body = request.body,
      name = _request$body.name,
      number = _request$body.number;
  User.findByIdAndUpdate(request.params.id, {
    name: name,
    number: number
  }, {
    "new": true,
    runValidators: true,
    context: 'query'
  }).then(function (updatedUser) {
    response.json(updatedUser);
  })["catch"](function (error) {
    return next(error);
  });
});
app["delete"]('/api/persons/:id', function (request, response, next) {
  User.findByIdAndRemove(request.params.id).then(function (result) {
    response.status(204).end();
  })["catch"](function (error) {
    return next(error);
  });
});
app.get('/api/persons/:id', function (request, response, next) {
  User.findById(request.params.id).then(function (user) {
    if (user) {
      response.json(user);
    } else {
      response.status(404).end();
    }
  })["catch"](function (error) {
    return next(error);
  });
});
app.get('/info', function (request, response) {
  var dateInfo = new Date();
  User.find({}).then(function (users) {
    response.send("<h2>Phonebook has info for ".concat(users.length, " people</h2><h2>").concat(dateInfo, "</h2>"));
  }); // response.json(info)
});

var unknownEndpoint = function unknownEndpoint(request, response) {
  response.status(404).send({
    error: 'unknown endpoint'
  });
};

app.use(unknownEndpoint);

var errorHandler = function errorHandler(error, request, response, next) {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    });
  }

  next(error);
};

app.use(errorHandler); // app.listen(3001, () => {                         // dev
//   console.log('Server running on port')
// })

app.listen(8080, function () {
  // fly.io
  console.log('Server running on port');
});