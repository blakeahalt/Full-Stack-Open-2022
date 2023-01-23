"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var baseUrl = 'http://localhost:3001/api/blogs';

var getAll = function getAll() {
  var request, response;
  return regeneratorRuntime.async(function getAll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          request = _axios["default"].get(baseUrl);
          _context.next = 3;
          return regeneratorRuntime.awrap(request);

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

var token = null;

var setToken = function setToken(newToken) {
  token = "bearer ".concat(newToken);
};

var create = function create(newObject) {
  var config, response;
  return regeneratorRuntime.async(function create$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          config = {
            headers: {
              Authorization: token
            }
          };
          _context2.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post(baseUrl, newObject, config));

        case 3:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var update = function update(id, newObject) {
  var url = "".concat(baseUrl, "/").concat(id);

  var request = _axios["default"].put(url, newObject);

  return request.then(function (response) {
    return response.data;
  });
};

var remove = function remove(blogId) {
  var config, response;
  return regeneratorRuntime.async(function remove$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          config = {
            headers: {
              Authorization: token
            }
          };
          _context3.next = 3;
          return regeneratorRuntime.awrap(_axios["default"]["delete"]("".concat(baseUrl, "/").concat(blogId), config));

        case 3:
          response = _context3.sent;
          return _context3.abrupt("return", response.data);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var blogService = {
  getAll: getAll,
  setToken: setToken,
  create: create,
  update: update,
  remove: remove
};
var _default = blogService;
exports["default"] = _default;