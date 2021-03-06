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
            ['es2015', 'es2017', { modules: false }]
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
    new ExtractTextPlugin({ filename: 'styles.css', disable: false, allChunks: true }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true
  }
}

module.exports = config
