global.TESTING = true;
// The location of the test `.env` file, relative to the project root.
global.ENV_PATH = './test/test-config.env';

const simpleJSDom = require('simple-jsdom');
global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));

require('babel-core/register');
require('./setup')();

simpleJSDom.install();
