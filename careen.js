const path = require('path');
const dbConfig = require('./server/api/util/db-config');

var config = dbConfig();

// Unfortunately, careen has a different signature than node-postgres.
// The dbConfig method returns correct version for node-postgres, so we
// need to manipulate it here.
if (typeof config === 'string') {
  config = {
    url: config
  };
}

module.exports = {
  client: {
    name: "postgresql",
    config: config
  },
  files: {
    directory: path.join(__dirname, 'migrations')
  }
}
