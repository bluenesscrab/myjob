const webpack = require('webpack');

module.exports = {
    entry: './src/app.js',
    output: {
        path:__dirname + '/build',
        filename: '[name].js',
    },
    module: {
      loaders: [
          {
            test: /\.ejs$/,
            loader: 'ejs-loader'
          }
      ]
    },
    plugins: [

    ]
};