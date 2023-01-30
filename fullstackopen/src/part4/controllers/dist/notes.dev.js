"use strict";

var notesRouter = require('express').Router();

var Note = require('../models/note');

var User = require('../models/user');

var jwt = require('jsonwebtoken');

var getTokenFrom = function getTokenFrom(request) {
  var authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }

  return null;
};

notesRouter.get('/', function _callee(request, response) {
  var notes;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Note.find({}).populate('user', {
            username: 1,
            name: 1
          }));

        case 2:
          notes = _context.sent;
          response.json(notes);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
notesRouter.post('/', function _callee2(request, response) {
  var body, decodedToken, user, note, savedNote;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          body = request.body;
          decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

          if (decodedToken.id) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", response.status(401).json({
            error: 'token invalid'
          }));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(User.findById(decodedToken.id));

        case 6:
          user = _context2.sent;
          note = new Note({
            content: body.content,
            important: body.important === undefined ? false : body.important,
            user: user._id
          });
          _context2.next = 10;
          return regeneratorRuntime.awrap(note.save());

        case 10:
          savedNote = _context2.sent;
          user.notes = user.notes.concat(savedNote._id);
          _context2.next = 14;
          return regeneratorRuntime.awrap(user.save());

        case 14:
          response.json(savedNote);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  });
});
notesRouter.get('/:id', function _callee3(request, response) {
  var note;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Note.findById(request.params.id));

        case 2:
          note = _context3.sent;

          if (note) {
            response.json(note);
          } else {
            response.status(404).end();
          }

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
notesRouter["delete"]('/:id', function _callee4(request, response) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Note.findByIdAndRemove(request.params.id));

        case 2:
          response.status(204).end();

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
});
notesRouter.put('/:id', function (request, response, next) {
  var body = request.body;
  var note = {
    content: body.content,
    important: body.important
  };
  Note.findByIdAndUpdate(request.params.id, note, {
    "new": true
  }).then(function (updatedNote) {
    response.json(updatedNote);
  })["catch"](function (error) {
    return next(error);
  });
});
module.exports = notesRouter;