const path = require('path');

module.exports = {
  client: {
    name: "postgresql",
    config: {
      url: `${process.env.DATABASE_URL}?ssl=true`
    }
  },
  files: {
    directory: path.join(__dirname, 'migrations')
  }
}
