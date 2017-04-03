'use strict';

const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const AssetsPlugin = require('assets-webpack-plugin');
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

  // When testing, we use lots of entries, but we want to ensure we only have
  // one output file.
  isBuildingForTests && new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1
  }),

  // Splits out the vendor code from our app code. Vendor code is much larger
  // than our app code, and it changes far less.
  !isBuildingForTests && new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks(module) {
      return module.context && module.context.indexOf('node_modules') !== -1;
    }
  }),

  // This splits out the Webpack initialization code into a separate bundle.
  // It is useful to enable us to set long cache times on the vendor bundle.
  !isBuildingForTests && new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity
  }),

  isProduction && new AssetsPlugin(),
].filter(Boolean);

const testFiles = glob.sync('./test/unit/client/**/*.js');
const allTestFiles = ['./test/setup/browser.js'].concat(testFiles);

// These externals are required for Enzyme to build properly for the browser
const externals = isBuildingForTests ? {
  cheerio: 'window',
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true
} : {};

const babelLoaderOptions = isBuildingForTests ? {
  plugins: 'babel-plugin-rewire'
} : {};

let filename;
if (isBuildingForTests) {
  filename = '__spec-build.js';
} else if (isProduction) {
  filename = '[name].[hash].js';
} else {
  filename = '[name].js';
}

module.exports = {
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  plugins,
  externals,

  entry: {
    app: isBuildingForTests ? allTestFiles : './client-src/index'
  },

  output: {
    path: isBuildingForTests ? local('./tmp') : local('./client-dist'),
    filename
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
