const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/persons',
    createProxyMiddleware({
      // 👇️ make sure to update your target
      target: 'http://localhost:3000',
      changeOrigin: true,
    }),
  );
};