"use strict";

// const jwt = require('jsonwebtoken')
// const notesRouter = require('express').Router()
// const Note = require('../models/note')
// const User = require('../models/user')
// // const getTokenFrom = request => {
// //   const authorization = request.get('authorization')
// //   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
// //     return authorization.substring(7)
// //   }
// //   return null
// // }
// notesRouter.get('/', async (request, response) => {
//   // Note.find({}).then(notes => {
//   const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
//   response.json(notes)
//   // })
// })
// notesRouter.get('/:id', async (request, response) => {
//   // try {
//   const note = await Note.findById(request.params.id)
//   if (note) {
//     response.json(note)
//   } else {
//     response.status(404).end()
//   }
//   // } catch(exception) {
//   //   next(exception)
//   // }
// })
// //   Note.findById(request.params.id)
// //     .then(note => {
// //       if (note) {
// //         response.json(note)
// //       } else {
// //         response.status(404).end()
// //       }
// //     })
// //     .catch(error => next(error))
// // })
// notesRouter.post('/', async (request, response) => {
//   const body = request.body
//   // const token = getTokenFrom(request)
//   const decodedToken = jwt.verify(request.token, process.env.SECRET)
//   if (!decodedToken.id) {
//     return response.status(401).json({ error: 'token missing or invalid' })
//   }
//   const user = await User.findById(decodedToken.id)
//   const note = new Note({
//     content: body.content,
//     important: body.important === undefined ? false : body.important,
//     date: new Date(),
//     user: user._id
//   })
//   const savedNote = await note.save()
//   await user.save()
//   response.status(201).json(savedNote)
//   // const body = request.body
//   // const user = await User.findById(body.userId)
//   // const note = new Note({
//   //   content: body.content,
//   //   important: body.important === undefined ? false : body.important,
//   //   date: new Date(),
//   //   user: user._id
//   // })
//   // const savedNote = await note.save()
//   // user.notes = user.notes.concat(savedNote._id)
//   // await user.save()
//   // response.json(savedNote)
//   // using 'express-async-errors' the two lines above replace the try-catch block
//   // try {
//   //   const savedNote = await note.save()
//   //   response.status(201).json(savedNote)
//   // } catch(exception) {
//   //   next(exception)
//   // }
//   // note.save()
//   //   .then(savedNote => {
//   //     response.status(201).json(savedNote)
//   //   })
//   //   .catch(error => next(error))
// })
// notesRouter.delete('/:id', async (request, response) => {
//   await Note.findByIdAndRemove(request.params.id)
//   response.status(204).end()
//   // using 'express-async-errors' the two lines above replace the try-catch block
//   // try {
//   //   await Note.findByIdAndRemove(request.params.id)
//   //   response.status(204).end()
//   // } catch(exception) {
//   //   next(exception)
//   // }
// })
// //   Note.findByIdAndRemove(request.params.id)
// //     .then(() => {
// //       response.status(204).end()
// //     })
// //     .catch(error => next(error))
// // })
// notesRouter.put('/:id', async (request, response) => {
//   const body = request.body
//   const note = {
//     content: body.content,
//     important: body.important,
//   }
//   await Note.findByIdAndUpdate(request.params.id, note, { new:true })
//   response.status(204).end()
//   // Note.findByIdAndUpdate(request.params.id, note, { new: true })
//   //   .then(updatedNote => {
//   //     response.json(updatedNote)
//   //   })
//   //   .catch(error => next(error))
// })
// module.exports = notesRouter
//Cypress test
var notesRouter = require('express').Router();

var Note = require('../models/note');

var User = require('../models/user');

var jwt = require('jsonwebtoken'); // const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }


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