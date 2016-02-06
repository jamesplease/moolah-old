'use strict';

// This applies our migrations each time that the server resets
// This is a shim until https://github.com/programble/careen/issues/1 is resolved

const exec = require('child_process').execSync;
const path = require('path');
const configPath = path.resolve(__dirname, '../../../', 'careen.js');

const migrator = path.resolve(
  __dirname,
  '../../../',
  'node_modules',
  '.bin',
  'careen'
);

function execute(command) {
  exec(`${migrator} -c "${configPath}" ${command}`);
}

exports.up = execute.bind(null, '-A -e');
exports.reset = function() {
  execute('-R -a -e');
  execute('-A -e');
};
