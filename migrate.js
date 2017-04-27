const path = require('path');
const fs = require('fs');

const envPath = global.ENV_PATH ? global.ENV_PATH : '.env';
require('dotenv').config({path: envPath});

const db = require('./server/util/db');

const migrationsDirectory = path.join(__dirname, 'migrations');
const migrations = fs.readdirSync(migrationsDirectory)
  .map((filename) => {
    const filePath = path.join(migrationsDirectory, filename);
    const query = fs.readFileSync(filePath, 'utf8');
    return () => db.query(query)
      .catch(err => {
        // Yeah yeah, these aren't really migrations. Whatevs!
        if (err.code === '42P07') {
          console.log('Table already exists, so it will not be created again.');
        } else {
          console.log('There was an error running the migrations. The error is:', err);
          process.exit(1);
        }
      });
  })
  .reduce((prev, next) => {
    return prev.then(next);
  }, Promise.resolve());

migrations.then(
  () => {
    console.log('Migrations run successfully!');
    process.exit(0);
  },
  // This shouldn't happen, but just in case
  () => process.exit(1)
);
