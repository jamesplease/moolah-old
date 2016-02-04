import pg from 'pg-promise';
import request from 'supertest';
import dbConfig from '../../../../server/api/util/db-config';
import app from '../../../../server/app';

const pgp = pg();

const TABLE_NAME = 'transaction';

function getInsertQuery(values) {
  return {
    name: 'transactions_create_one',
    text: `INSERT INTO ${TABLE_NAME} (description, value, date) VALUES ($1, $2, $3)`,
    values: [values.description, values.value, values.date]
  };
}

function hasDataAttr(res) {
  if (!('data' in res.body)) {
    throw new Error('Missing `data` attribute.');
  }
}

function dataIsArray(res) {
  if (!Array.isArray(res.body.data)) {
    return new Error('The `data` attribute is not an array.');
  }
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

  // Ensures the tests immediately exit
  afterEach(() => {
    pgp.end();
  });

  describe('/transactions', () => {
    it('should return 200', done => {
      request(app())
        .get('/transactions')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) { return done(err); }
          done();
        });
    });

    it('should have a data attribute that is an array of length 2', done => {
      request(app())
        .get('/transactions')
        .set('Accept', 'application/json')
        .expect(hasDataAttr)
        .expect(dataIsArray)
        .expect(res => {
          if (res.body.data.length !== 2) {
            return new Error('The length of the array was not 2.');
          }
        })
        .end(function(err, res) {
          if (err) { return done(err); }
          done();
        });
    });
  });
});
