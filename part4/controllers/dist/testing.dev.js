"use strict";

var testingRouter = require('express').Router(); // const Note = require('../models/note')


var Blog = require('../models/blogs');

var User = require('../models/user');

testingRouter.post('/reset', function _callee(request, response) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Blog.deleteMany({}));

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
module.exports = testingRouter;