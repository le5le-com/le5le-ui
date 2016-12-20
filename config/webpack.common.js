var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var helpers = require('./helpers');

const AUTOPREFIXER_BROWSERS = [
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];

module.exports = {
  entry: {
    'app': './demo/assets/index.js'
  },

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader')
      }
    ]
  },
  postcss: function (bundler) {
    return [
      require('postcss-import')({ addDependencyTo: bundler }),
      require('precss')(),
      require('autoprefixer')({
        browsers: AUTOPREFIXER_BROWSERS
      })
    ];
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app']
    }),
    new HtmlWebpackPlugin({
      template: 'demo/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: 'demo/go.html',
      filename: 'go.html'
    }),
    new HtmlWebpackPlugin({
      template: 'demo/go-button.html',
      filename: 'go-button.html'
    }),
    new HtmlWebpackPlugin({
      template: 'demo/go-layout.html',
      filename: 'go-layout.html'
    }),
    new CopyWebpackPlugin([
      { from: 'demo/assets/img', to: 'assets/img' },
      { from: 'demo/browser.html', to: 'browser.html' },
    ], {
      ignore: [
        '*.txt',
        '*.ts'
      ]
    })
  ]
};
