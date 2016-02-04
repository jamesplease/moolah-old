import pg from 'pg-promise';
import dbConfig from '../../../../server/api/util/db-config';

const pgp = pg();

const TABLE_NAME = 'transaction';

function getInsertQuery(values) {
  return {
    name: 'transactions_create_one',
    text: `INSERT INTO ${TABLE_NAME} (description, value, date) VALUES ($1, $2, $3)`,
    values: [values.description, values.value, values.date]
  };
}

describe('Transactions', () => {
  // This loads our fixture data
  beforeEach(() => {
    const queries = [
      getInsertQuery({ value: '10.20'}),
      getInsertQuery({ value: '1000.20', description: 'test'})
    ];

    const db = pgp(dbConfig());
    return Promise.all(queries.map(q => db.none(q)));
  });

  describe('A mock test', () => {
    it('should pass', () => {
      var db = pgp(dbConfig());

      return db.any(`SELECT * FROM ${TABLE_NAME}`)
        .then(result => {
          expect(result).to.have.length(2);
        });
    });
  });
});
