"use strict";

// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const usersRouter = require('express').Router()
// // const Blog = require('../models/blogs')
// const Note = require('../models/note')
// const User = require('../models/user')
// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }
// usersRouter.post('/', async (request, response) => {
//   const { username, name, password } = request.body
//   const existingUser = await User.findOne({ username })
//   if (!password) {
//     return response.status(400).json({
//       error: 'missing password'
//     })
//   }
//   else if (password.length < 3) {
//     return response.status(400).json({
//       error: 'password must be more than 3 characters'
//     })
//   }
//   else if (!username) {
//     return response.status(400).json({
//       error: 'missing username'
//     })
//   }
//   else if (username.length < 3) {
//     return response.status(400).json({
//       error: 'username must be more than 3 characters'
//     })
//   }
//   else if (existingUser) {
//     return response.status(400).json({
//       error: 'username must be unique'
//     })
//   }
//   const token = getTokenFrom(request)
//   const decodedToken = jwt.verify(token, process.env.SECRET)
//   if (!decodedToken.id) {
//     return response.status(401).json({ error: 'token missing or invalid' })
//   }
//   const saltRounds = 10
//   const passwordHash = await bcrypt.hash(password, saltRounds)
//   const user = new User({
//     username: username,
//     name: name,
//     passwordHash: passwordHash,
//   })
//   // const savedUser = await user.save()
//   // response.status(201).json(savedUser)
//   // const savedBlog = await user.save()
//   // user.blogs = user.blogs.concat(savedBlog._id)
//   // await user.save()
//   // response.status(201).json(savedBlog)
//   const savedNote = await user.save()
//   // user.notes = user.notes.concat(savedNote._id)
//   // await user.save()
//   response.status(201).json(savedNote)
// })
// usersRouter.get('/', async (request, response) => {
//   const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id:1 })
//   response.json(users)
// })
// usersRouter.get('/:id', async (request, response) => {
//   const users = await User.findById(request.params.id)
//   if (users) {
//     response.json(users)
//   } else {
//     response.status(404).end()
//   }
// })
// usersRouter.delete('/:id', async (request, response) => {
//   await User.findByIdAndRemove(request.params.id)
//   response.status(204).end()
// })
// module.exports = usersRouter
//Cypress Test
var bcrypt = require('bcrypt');

var usersRouter = require('express').Router();

var User = require('../models/user');

usersRouter.post('/', function _callee(request, response) {
  var _request$body, username, name, password, saltRounds, passwordHash, user, savedUser, savedNote;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _request$body = request.body, username = _request$body.username, name = _request$body.name, password = _request$body.password;
          saltRounds = 10;
          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(password, saltRounds));

        case 4:
          passwordHash = _context.sent;
          user = new User({
            username: username,
            name: name,
            passwordHash: passwordHash
          });
          _context.next = 8;
          return regeneratorRuntime.awrap(user.save());

        case 8:
          savedUser = _context.sent;
          response.status(201).json(savedUser);
          _context.next = 12;
          return regeneratorRuntime.awrap(user.save());

        case 12:
          savedNote = _context.sent;
          user.notes = user.notes.concat(savedNote._id);
          _context.next = 16;
          return regeneratorRuntime.awrap(user.save());

        case 16:
          response.status(201).json(savedNote);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
});
usersRouter.get('/', function _callee2(request, response) {
  var users;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.find({}).populate('notes', {
            content: 1,
            important: 1
          }));

        case 2:
          users = _context2.sent;
          response.json(users);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = usersRouter;