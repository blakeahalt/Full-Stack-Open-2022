"use strict";

// const testingRouter = require('express').Router()
// const Note = require('../models/note')
// // const Blog = require('../models/blog')
// const User = require('../models/user')
// testingRouter.post('/reset', async (request, response) => {
//   await Note.deleteMany({})
//   // await Blog.deleteMany({})
//   await User.deleteMany({})
//   response.status(204).end()
// })
// module.exports = testingRouter
//Cypress test
var router = require('express').Router();

var Note = require('../models/note');

var User = require('../models/user');

router.post('/reset', function _callee(request, response) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Note.deleteMany({}));

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(User.deleteMany({}));

        case 4:
          response.status(204).end();

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;