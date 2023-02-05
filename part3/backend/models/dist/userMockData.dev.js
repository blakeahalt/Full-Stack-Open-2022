"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var axios = require('axios');

var getData = function getData() {
  var request = axios.get('https://retoolapi.dev/WTVgib/data');
  return request.then(function (response) {
    console.log(response.data);
    response.data;
  });
};

var _default = getData;
exports["default"] = _default;