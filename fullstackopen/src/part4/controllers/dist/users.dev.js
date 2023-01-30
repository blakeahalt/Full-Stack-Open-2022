"use strict";

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