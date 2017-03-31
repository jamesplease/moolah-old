'use strict';

const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const local = path.join.bind(path, __dirname);
const isProduction = process.env.NODE_ENV === 'production';
const isBuildingForTests = process.env.BROWSER_TESTING === 'true';

const plugins = [
  process.env.ANALYZE_BUILD && new BundleAnalyzerPlugin(),

  // In production set the 'NODE_ENV' value to 'production'.
  isProduction && new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),

  // Minify the source code in production.
  isProduction && new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    output: {
      comments: false
    },
    compress: {
      warnings: false,
      screw_ie8: true
    }
  }),

  isBuildingForTests && new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1
  }),
].filter(Boolean);

const testFiles = glob.sync('./test/unit/client/**/*.js');
const allTestFiles = ['./test/setup/browser.js'].concat(testFiles);
const externals = isBuildingForTests ? {
  cheerio: 'window',
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true
} : {};

const babelLoaderOptions = isBuildingForTests ? {
  plugins: 'babel-plugin-rewire'
} : {};

module.exports = {
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  plugins,
  externals,

  entry: {
    app: isBuildingForTests ? allTestFiles : './client-src/index'
  },

  output: {
    path: isBuildingForTests ? local('./tmp') : local('./client-dist'),
    filename: isBuildingForTests ? '__spec-build.js' : 'app.js',
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: babelLoaderOptions
    }]
  },
};
