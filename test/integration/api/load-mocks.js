import migrate from '../../../server/api/util/migrate';

// This needs to run SQL to insert things
// function loadMock(/* file */) {
// const DB = require('./database');
// const content = fs.readFileSync(path.join(mockDir, file+'.sql'), 'utf-8');
// const commands = bPromise.resolve(content.replace(/\n$/, '').split(';'));
// const ran = [];
// return commands.each(function (line) {
//   if (line === '') {
//     return;
//   }
//   const loadCommand = loadRegex.exec(line);
//   if (loadCommand) {
//     return loadFixture(loadCommand[1]).then(function (sql) {
//       ran.push(sql);
//     });
//   }
//   return DB.knex.raw(line).then(function () {
//     ran.push(line);
//   });
// }).return(ran)
// }

function loadMocks() {
  try {
    migrate.reset();
  } catch (e) {
    return e;
  }
  // return Array.isArray(mock) ? bPromise.each(mock, loadMock) : loadMock(mock);
}

export default loadMocks;
