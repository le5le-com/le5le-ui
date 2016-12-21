var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var glob = require('glob');
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

var config = {
  entry: {
    'app': './demo/assets/index.js'
  },

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [
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
      filename: 'go.html',
      template: 'demo/go-button.html'
    }),
    new CopyWebpackPlugin([
      { from: 'demo/assets/img', to: 'assets/img' },
      { from: 'demo/browser/browser.html', to: 'browser.html' }
    ], {
      ignore: [
        '*.txt',
        '*.ts'
      ]
    })
  ]
};

function getEntry(globPath, pathDir) {
  var files = glob.sync(globPath);

  var paths = [];
  for (var i = 0; i < files.length; i++) {
    paths.push(path.basename(files[i], path.extname(files[i])));
  }
  return paths;
}

// html
var files = getEntry('demo/*.html');
files.forEach(function(filename) {
  var conf = {
    filename: filename + '.html',
    template: 'demo/' + filename + '.html',
    minify: {                         //压缩HTML文件
      removeComments: true,         //移除HTML中的注释
      collapseWhitespace: false    //删除空白符与换行符
    }
  };
  // config.plugins.push(new HtmlWebpackPlugin(conf));
});

// ejs
var ejsFiles = getEntry('demo/*.ejs');
ejsFiles.forEach(function(filename) {
  var conf = {
    filename: filename + '.html',
    template: 'demo/' + filename + '.ejs'
  };
  // config.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = config;
