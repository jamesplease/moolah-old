const path = require('path');
const fs = require('fs');
const ApiPls = require('api-pls');

const envPath = global.ENV_PATH ? global.ENV_PATH : '.env';
require('dotenv').config({path: envPath});

const dbConfig = require('./config/db-config');

const resourcesDirectory = path.join(__dirname, 'resources');
const apiPls = new ApiPls({
  apiVersion: 1,
  databaseUrl: dbConfig,
  resourcesDirectory,
  // Our db URL already has SSL configured, so we don't need ApiPls to add it
  connectWithSsl: false
});

const migrationsDirectory = path.join(__dirname, 'migrations');
const migrations = fs.readdirSync(migrationsDirectory)
  .map((filename) => {
    const filePath = path.join(migrationsDirectory, filename);
    return fs.readFileSync(filePath, 'utf8');
  });

const query = apiPls.db.$config.pgp.helpers.concat(migrations);
apiPls.db.query(query)
  .then(() => {
    console.log('Migrations run successfully.');
    process.exit(0);
  })
  .catch(err => {
    console.log('There was an error running the migrations.', err);
    process.exit(1);
  });
