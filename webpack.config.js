const path = require('path');

module.exports = {
  entry: './test/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'test')
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
};
