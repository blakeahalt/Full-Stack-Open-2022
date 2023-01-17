"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var jwt = require('jsonwebtoken');

var baseUrl = 'http://localhost:3001/api/blogs';

var User = require('../models/user');

var getTokenFrom = function getTokenFrom(request) {
  var authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }

  return null;
};

var getAll = function getAll() {
  var request = _axios["default"].get(baseUrl);

  return request.then(function (response) {
    return response.data;
  });
};

var token = null;

var setToken = function setToken(newToken) {
  token = "bearer ".concat(newToken);
};

var create = function create(blogObject, user, response, request) {
  var token, decodedToken, config, savedBlog;
  return regeneratorRuntime.async(function create$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // const body = request.body
          token = getTokenFrom(User);
          decodedToken = jwt.verify(token, process.env.SECRET);

          if (decodedToken.id) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", response.status(401).json({
            error: 'token missing or invalid'
          }));

        case 4:
          // const user = await User.findById(decodedToken.id)
          config = {
            headers: {
              Authorization: token
            }
          };
          _context.next = 7;
          return regeneratorRuntime.awrap(_axios["default"].post(baseUrl, blogObject, config));

        case 7:
          response = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(user.save());

        case 10:
          savedBlog = _context.sent;
          user.blogs = user.blogs.concat(savedBlog._id);
          _context.next = 14;
          return regeneratorRuntime.awrap(user.save());

        case 14:
          response.status(201).json(savedBlog);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
};

var blogService = {
  getAll: getAll,
  setToken: setToken,
  create: create
};
var _default = blogService;
exports["default"] = _default;