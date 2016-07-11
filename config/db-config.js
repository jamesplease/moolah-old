var dbConfig;

// If this variable exists, then we're either on production
// or working with the production database locally
if (process.env.DATABASE_URL) {
  dbConfig = `${process.env.DATABASE_URL}?ssl=true`;
}
// Otherwise, we either haven't configured our local environment
// or we're on Travis. I need to make the local environment more robust,
// but in the meantime this just sets things up for Travis.
else {
  dbConfig = {
    host: 'localhost',
    user: 'postgres',
    database: 'moolah_test_db',
    password: undefined
  };
}

module.exports = dbConfig;
