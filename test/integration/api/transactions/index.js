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

describe('A mock test', () => {
  it('should pass', done => {
    const query = getInsertQuery({
      value: '10.20'
    });

    var db = pgp(dbConfig());

    db.none(query)
      .then(() => {
        return db.any(`SELECT * FROM ${TABLE_NAME}`)
          .then(result => {
            expect(result).to.have.length(1);
            done();
          });
      })
      .catch(() => {
        throw new Error('fail');
        done();
      });
  });
});

describe('Another mock test', () => {
  it('should pass', done => {
    const query = getInsertQuery({
      value: '1000.00',
      description: 'test'
    });

    var db = pgp(dbConfig());

    db.none(query)
      .then(() => {
        return db.any(`SELECT * FROM ${TABLE_NAME}`)
          .then(result => {
            expect(result).to.have.length(1);
            done();
          });
      })
      .catch(() => {
        throw new Error('fail');
        done();
      });
  });
});
