"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var baseUrl = 'http://localhost:3001/api/notes'; // const baseUrl = 'api/notes'

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

var update = function update(id, newObject) {
  var request = _axios["default"].put("".concat(baseUrl, "/").concat(id), newObject);

  return request.then(function (response) {
    return response.data;
  });
};

var _default = {
  getAll: getAll,
  create: create,
  update: update
};
exports["default"] = _default;