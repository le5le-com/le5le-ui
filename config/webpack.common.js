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
    extensions: ['.js', '.json'],
    modules: [helpers.root('src'), helpers.root('node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.pcss$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader"
          },{
            loader: "postcss-loader"
          }]
        })
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.pcss$/,
      options: {
        postcss: function (bundler) {
          return [
            require('postcss-import')({ addDependencyTo: bundler }),
            require('precss')(),
            require('autoprefixer')({
              browsers: AUTOPREFIXER_BROWSERS
            })
          ];
        },
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
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
  config.plugins.push(new HtmlWebpackPlugin(conf));
});

// ejs
var ejsFiles = getEntry('demo/*.ejs');
ejsFiles.forEach(function(filename) {
  var conf = {
    filename: filename + '.html',
    template: '!!ejs-compiled-loader!demo/' + filename + '.ejs'
  };
  config.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = config;
