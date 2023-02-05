"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const baseUrl = 'http://localhost:3001/api/persons' //dev
var baseUrl = '/api/persons'; //production

var getAll = function getAll() {
  var request = _axios["default"].get(baseUrl);

  return request.then(function (response) {
    return response.data;
  });
};

var create = function create(newObject) {
  var request = _axios["default"].post(baseUrl, newObject);

  return request.then(function (response) {
    return response.data;
  });
};

var remove = function remove(id) {
  var request = _axios["default"]["delete"]("".concat(baseUrl, "/").concat(id));

  return request.then(function (response) {
    return response.data;
  });
};

var removeAll = function removeAll() {
  var request = _axios["default"]["delete"](baseUrl);

  return request.then(function (response) {
    return response.data;
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
  remove: remove,
  update: update,
  removeAll: removeAll
};
var _default = noteService;
exports["default"] = _default;