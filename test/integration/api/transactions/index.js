import _ from 'lodash';
import pg from 'pg-promise';
import request from 'supertest';
import dbConfig from '../../../../config/db-config';
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

function hasAttr(attr, res) {
  if (!(attr in res.body)) {
    throw new Error('Response missing `${attr}` attribute.');
  }
}

function doesNotHaveAttr(attr, res) {
  if (attr in res.body) {
    throw new Error('Response has `${attr}` attribute.');
  }
}

function dataIsArray(res) {
  if (!Array.isArray(res.body.data)) {
    return new Error('The `data` attribute is not an array.');
  }
}

function dataIsSingleObj(res) {
  if (!_.isObject(res.body.data) || _.isArray(res.body.data)) {
    return new Error('The `data` attribute is not a non-Array Object.');
  }
}

function dataEquals(obj, res) {
  if (!_.isEqual(res.body.data, obj)) {
    return new Error('The data did not match');
  }
}

describe('Transactions', () => {
  // Ensures the tests immediately exit
  afterEach(() => {
    pgp.end();
  });

  describe('/transactions', () => {
    describe("when there's no data", () => {
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

      it('should have a data attribute that is an array of length 0', done => {
        request(app())
          .get('/transactions')
          .set('Accept', 'application/json')
          .expect(_.partial(hasAttr, 'data'))
          .expect(_.partial(doesNotHaveAttr, 'errors'))
          .expect(dataIsArray)
          .expect(res => {
            if (res.body.data.length !== 0) {
              return new Error('The length of the array was not 0.');
            }
          })
          .end(function(err, res) {
            if (err) { return done(err); }
            done();
          });
      });
    });

    describe('when there is data', () => {
      beforeEach(() => {
        const queries = [
          getInsertQuery({value: '10.20', date: '2016-01-10'}),
          getInsertQuery({value: '1000.20', description: 'test'})
        ];

        const db = pgp(dbConfig);
        return Promise.all(queries.map(q => db.none(q)));
      });

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
          .expect(_.partial(hasAttr, 'data'))
          .expect(_.partial(doesNotHaveAttr, 'errors'))
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

      it('should return the correct resources', done => {
        const data = [
          {
            id: 1,
            value: '10.20',
            description: null,
            date: '2016-01-10'
          },
          {
            id: 2,
            value: '1000.20',
            description: 'test',
            date: null
          }
        ];

        request(app())
          .get('/transactions')
          .set('Accept', 'application/json')
          .expect(_.partial(dataEquals, data))
          .end(function(err, res) {
            if (err) { return done(err); }
            done();
          });
      });
    });
  });

  describe('/transactions/:id', () => {
    describe("when the resource doesn't exist", () => {
      it('should return 404', done => {
        request(app())
          .get('/transactions/2')
          .set('Accept', 'application/json')
          .expect(404)
          .end(function(err, res) {
            if (err) { return done(err); }
            done();
          });
      });
    });

    describe('when the resource exists', () => {
      beforeEach(() => {
        const queries = [
          getInsertQuery({value: '10.20', date: '2015-12-12'}),
          getInsertQuery({value: '1000.20', description: 'test'})
        ];

        const db = pgp(dbConfig);
        return Promise.all(queries.map(q => db.none(q)));
      });

      it('should return 200', done => {
        request(app())
          .get('/transactions/1')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function(err, res) {
            if (err) { return done(err); }
            done();
          });
      });

      it('should have a data attribute that is an Object', done => {
        request(app())
          .get('/transactions/1')
          .set('Accept', 'application/json')
          .expect(_.partial(hasAttr, 'data'))
          .expect(_.partial(doesNotHaveAttr, 'errors'))
          .expect(dataIsSingleObj)
          .end(function(err, res) {
            if (err) { return done(err); }
            done();
          });
      });

      it('should return the correct resource', done => {
        const data = {
          id: 1,
          value: '10.20',
          description: null,
          date: '2015-12-12'
        };

        request(app())
          .get('/transactions/1')
          .set('Accept', 'application/json')
          .expect(_.partial(dataEquals, data))
          .end(function(err, res) {
            if (err) { return done(err); }
            done();
          });
      });
    });
  });
});
