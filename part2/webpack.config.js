const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
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
    allowedHosts: ['localhost', 'https://country.fly.dev/']
  }
  // resolve: {
  //   fallback: {
  //     "http": require.resolve("stream-http"),
  //     "./zlib_bindings": require.resolve("node-zlib-ng")
  //   }
  // },
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     process: 'process',
  //     Buffer: ['buffer', 'Buffer'],
  //   })
  // ]
};
