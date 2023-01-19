// const path = require('path')

// module.exports = {
//   entry: './src/index.js',
//   output: {
//     path: path.join(__dirname, 'build'),
//     // app.use(express.static(path.join(__dirname, 'build')));
//     filename: 'bundle.js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader']
//       }
//     ]
//   },
//   devServer: {
//     // Add the allowedHosts option here
//     allowedHosts: ['localhost', 'https://fullstackopen-frontend-3-5.fly.dev/']
//   }
// }
const webpack = require('webpack');

const {defineConfig} = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: true,

    configureWebpack: {
        //process: {env: {}},
        plugins: [
            // fix "process is not defined" error:
            // (do "npm install process" before running the build)
            new webpack.ProvidePlugin({
              process: 'process/browser',
            }),
        ],
        resolve: {
            fallback: {
                http: require.resolve("stream-http"),
                https: require.resolve("https-browserify"),
                crypto: require.resolve("crypto-browserify"),
                stream: require.resolve("stream-browserify"),
                os: require.resolve("os-browserify/browser"),
                url: require.resolve("url"),
                assert: require.resolve("assert"),
            },
        },
    }
});