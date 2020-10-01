const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: '/dist/',
  },
  devServer: {
    port: 8080,
    publicPath: '/dist/',
    contentBase: './client/src',
    proxy: {
      '/images': 'http://localhost:3000',
      '/tags': 'http://localhost:3000',
      '/api': 'http://localhost:3000',
    },
    hot: true,
  },
  entry: path.resolve(__dirname, './client/src/index.js'),
  module: {
    rules: [{
      test: /.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /.(css|scss)$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    },
    {
      test: /.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf|ico)$/,
      use: [
        'file-loader',
      ],
    },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx',]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
      favicon: './client/src/favicon.ico',
      // logo: './client/src/photo-depot-logo.png'
    }),
    new CleanWebpackPlugin(),
    new Dotenv(),

  ]
}