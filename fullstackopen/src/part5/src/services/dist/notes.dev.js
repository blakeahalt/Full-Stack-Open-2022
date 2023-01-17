"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const jwt = require('jsonwebtoken')
var baseUrl = 'http://localhost:3001/api/notes'; // const User = require('../models/user')
// const Note = require('../models/note')

var getAll = function getAll() {
  var request = _axios["default"].get(baseUrl);

  return request.then(function (response) {
    return response.data;
  });
};

var token = null;

var setToken = function setToken(newToken) {
  token = "bearer ".concat(newToken);
}; // const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }


var create = function create(newObject) {
  var config, response;
  return regeneratorRuntime.async(function create$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          config = {
            headers: {
              Authorization: token
            }
          };
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post(baseUrl, newObject, config));

        case 3:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}; //   const request = axios.post(baseUrl, newObject)
//   return request.then(response => response.data)
//   const body = request.body
//   const token = getTokenFrom(request)
//   const decodedToken = jwt.verify(token, process.env.SECRET)
//   if (!decodedToken.id) {
//       return response.status(401).json({ error: 'token missing or invalid' })
//     }
//     const user = await User.findById(decodedToken.id)
//     const note = new Note({
//         content: body.content,
//         important: body.important === undefined ? false : body.important,
//         date: new Date(),
//         user: user._id
//     })
//     const savedNote = await note.save()
//     await user.save()
//     response.status(201).json(savedNote)
// }


var update = function update(id, newObject) {
  var request = _axios["default"].put("".concat(baseUrl, "/").concat(id), newObject);

  return request.then(function (response) {
    return response.data;
  });
};

var noteService = {
  getAll: getAll,
  create: create,
  update: update,
  setToken: setToken
};
var _default = noteService;
exports["default"] = _default;