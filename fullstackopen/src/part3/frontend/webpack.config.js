const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    // app.use(express.static(path.join(__dirname, 'build')));
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    // Add the allowedHosts option here
    allowedHosts: ['localhost', 'https://fullstackopen-frontend-3-5.fly.dev/']
  }
}