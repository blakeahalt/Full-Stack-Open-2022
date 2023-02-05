"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var baseUrl = 'http://localhost:3001/api/notes'; // const baseUrl = '/api/notes'

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
};

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