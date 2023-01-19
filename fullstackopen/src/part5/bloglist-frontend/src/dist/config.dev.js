"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require('dotenv').config();

var node_env = process.env.NODE_ENV;
var baseUrl = 'http://localhost:3001/api/blogs'; // production mode

if (!node_env || node_env === 'development') {
  baseUrl = '/api/blogs'; // dev mode
}

var config = {
  baseUrl: baseUrl
};
var _default = config;
exports["default"] = _default;