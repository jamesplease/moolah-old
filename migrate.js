const path = require('path');
const fs = require('fs');

const envPath = global.ENV_PATH ? global.ENV_PATH : '.env';
require('dotenv').config({path: envPath});

const db = require('./server/util/db');

const migrationsDirectory = path.join(__dirname, 'migrations');
const migrations = fs.readdirSync(migrationsDirectory)
  .map((filename) => {
    const filePath = path.join(migrationsDirectory, filename);
    return fs.readFileSync(filePath, 'utf8');
  });

const query = db.$config.pgp.helpers.concat(migrations);
db.query(query)
  .then(() => {
    console.log('Migrations run successfully.');
    process.exit(0);
  })
  .catch(err => {
    // 42P07 = duplicate table. This means the database already has this
    // table, so we do not need to run it again
    if (err.code === '42P07') {
      console.log('This table already exists, so it will not be created again. The Postgres "error" is:', err);
      process.exit(0);
    } else {
      console.log('There was an error running the migrations.', err);
      process.exit(1);
    }
  });
