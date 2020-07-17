/* eslint-disable prettier/prettier */
// eslint-disable-next-line node/no-unpublished-require
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/bundle.js',
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ],
};
