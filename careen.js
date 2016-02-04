const path = require('path');
const dbConfig = require('./config/db-config');

var config;

// Unfortunately, careen has a different signature than node-postgres.
// The dbConfig method returns correct version for node-postgres, so we
// need to manipulate it here.
if (typeof dbConfig === 'string') {
  config = {
    url: dbConfig
  };
} else {
  config = dbConfig;
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
