const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/',
    createProxyMiddleware({
      // 👇️ make sure to update your target
      target: 'http://localhost:3000',
      changeOrigin: true,
    }),
  )
}