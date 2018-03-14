const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const config = {
  context: path.resolve(__dirname, 'src'),
  entry: [
    './js/index.js',
    './scss/index.scss'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src/js'),
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }],
            'es2017'
          ],
          plugins: [
	          'transform-class-properties',
	          'transform-object-rest-spread',
	          'transform-async-to-generator'
          ]
        }
      }]
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract(['css-loader','sass-loader'])
    }]
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'styles.css', disable: false, allChunks: true })
  ]
}

module.exports = config
