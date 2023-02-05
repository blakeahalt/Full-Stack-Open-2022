"use strict";

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

var loginRouter = require('express').Router();

var User = require('../models/user');

loginRouter.post('/', function _callee(request, response) {
  var _request$body, username, password, user, passwordCorrect, userForToken, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _request$body = request.body, username = _request$body.username, password = _request$body.password;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            username: username
          }));

        case 3:
          user = _context.sent;

          if (!(user === null)) {
            _context.next = 8;
            break;
          }

          _context.t0 = false;
          _context.next = 11;
          break;

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.passwordHash));

        case 10:
          _context.t0 = _context.sent;

        case 11:
          passwordCorrect = _context.t0;

          if (user && passwordCorrect) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", response.status(401).json({
            error: 'invalid username or password'
          }));

        case 14:
          userForToken = {
            username: user.username,
            id: user._id
          };
          token = jwt.sign(userForToken, process.env.SECRET); // token expires in 60*60 seconds, that is, in one hour
          // const token = jwt.sign(userForToken, process.env.SECRET,{ expiresIn: 60*60 }
          // )

          response.status(200).send({
            token: token,
            username: user.username,
            name: user.name
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = loginRouter;