import _ from 'lodash';
import pg from 'pg-promise';
import request from 'supertest';
import dbConfig from '../../../../config/db-config';
import app from '../../../../server/app';
import serverErrors from '../../../../server/api/errors/server-errors';
import responseValidation from '../utils/response-validation';
import Inserts from '../utils/concatenate-inserts';

const pgp = pg();

const TABLE_NAME = 'transaction';

function getInsertQuery(values) {
  // Ensure that each key exists – even if it's null. pg-promise
  // will error otherwise. For more, reference:
  // https://github.com/vitaly-t/pg-promise#named-parameters
  values = _.map(values, v => {
    return _.defaults(v, {
      date: null,
      description: null,
      value: null
    });
  });
  var formattedValues = new Inserts('${date}, ${description}, ${value}', values);
  return ['INSERT INTO transaction(date, description, value) VALUES $1', formattedValues];
}

describe('Transactions', () => {
  // Ensures the tests immediately exit
  afterEach(() => {
    pgp.end();
  });

  describe('GET /transactions', () => {
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
          .expect(_.partial(responseValidation.hasAttr, 'data'))
          .expect(_.partial(responseValidation.doesNotHaveAttr, 'errors'))
          .expect(responseValidation.dataIsArray)
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
        const db = pgp(dbConfig);

        const values = [
          {value: '10.20', date: '2016-01-10'},
          {value: '1000.20', description: 'test'}
        ];

        const query = getInsertQuery(values);
        return db.none(query[0], query[1]);
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
          .expect(_.partial(responseValidation.hasAttr, 'data'))
          .expect(_.partial(responseValidation.doesNotHaveAttr, 'errors'))
          .expect(responseValidation.dataIsArray)
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
          .expect(_.partial(responseValidation.dataEquals, data))
          .end(function(err, res) {
            if (err) { return done(err); }
            done();
          });
      });
    });
  });

  describe('GET /transactions/:id', () => {
    describe("when the resource doesn't exist", () => {
      it('should return a 404', done => {
        request(app())
          .get('/transactions/2')
          .set('Accept', 'application/json')
          .expect(404)
          .expect(_.partial(responseValidation.errorsEquals, [serverErrors.notFound.body()]))
          .end(function(err, res) {
            if (err) { return done(err); }
            done();
          });
      });
    });

    describe('when the resource exists', () => {
      beforeEach(() => {
        const db = pgp(dbConfig);

        const values = [
          {value: '10.20', date: '2015-12-12'},
          {value: '1000.20', description: 'test'}
        ];

        const query = getInsertQuery(values);
        return db.none(query[0], query[1]);
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
          .expect(_.partial(responseValidation.hasAttr, 'data'))
          .expect(_.partial(responseValidation.doesNotHaveAttr, 'errors'))
          .expect(responseValidation.dataIsSingleObj)
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
          .expect(_.partial(responseValidation.dataEquals, data))
          .end(function(err, res) {
            if (err) { return done(err); }
            done();
          });
      });
    });
  });

  describe('PATCH /transactions/:id', () => {
    describe("when the resource doesn't exist", () => {
      it('should return 404', done => {
        request(app())
          .patch('/transactions/2')
          .set('Accept', 'application/json')
          .send({value: '5.00'})
          .expect(404)
          .expect(_.partial(responseValidation.errorsEquals, [serverErrors.notFound.body()]))
          .end(function(err, res) {
            if (err) { return done(err); }
            done();
          });
      });
    });

    describe('when the resource exists', () => {
      beforeEach(() => {
        const db = pgp(dbConfig);

        const values = [
          {value: '10.20', date: '2015-12-12'},
          {value: '1000.20', description: 'test'}
        ];

        const query = getInsertQuery(values);
        return db.none(query[0], query[1]);
      });

      describe('and the request body is empty', () => {
        it('should return 200', done => {
          request(app())
            .patch('/transactions/1')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
              if (err) { return done(err); }
              done();
            });
        });

        it('should return the unmodified resource', done => {
          const data = {
            id: 1,
            value: '10.20',
            date: '2015-12-12',
            description: null
          };

          request(app())
            .patch('/transactions/1')
            .set('Accept', 'application/json')
            .expect(_.partial(responseValidation.dataEquals, data))
            .end(function(err, res) {
              if (err) { return done(err); }
              done();
            });
        });
      });

      describe('and the request is completely valid', () => {
        it('should return 200', done => {
          request(app())
            .patch('/transactions/1')
            .set('Accept', 'application/json')
            .send({value: '5.00'})
            .expect(200)
            .end(function(err, res) {
              if (err) { return done(err); }
              done();
            });
        });

        it('should return the modified resource', done => {
          const data = {
            id: 1,
            value: '5.00',
            date: '2015-12-12',
            description: null
          };

          request(app())
            .patch('/transactions/1')
            .set('Accept', 'application/json')
            .send({value: '5.00'})
            .expect(_.partial(responseValidation.dataEquals, data))
            .end(function(err, res) {
              if (err) { return done(err); }
              done();
            });
        });
      });

      describe('and the request fails validation', () => {
        it('should return 400', done => {
          request(app())
            .patch('/transactions/1')
            .set('Accept', 'application/json')
            .send({date: 'not a date lol'})
            .expect(400)
            .end(function(err, res) {
              if (err) { return done(err); }
              done();
            });
        });

        it('should return the correct error', done => {
          const errors = [{
            status: '400',
            title: 'Bad Request',
            detail: '"date" must be date format'
          }];

          request(app())
            .patch('/transactions/1')
            .set('Accept', 'application/json')
            .send({date: 'not a date lol'})
            .expect(_.partial(responseValidation.errorsEquals, errors))
            .end(function(err, res) {
              if (err) { return done(err); }
              done();
            });
        });
      });

      describe('and the request body has both valid and invalid attributes', () => {
        it('should return 200', done => {
          request(app())
            .patch('/transactions/1')
            .set('Accept', 'application/json')
            .send({description: 'chocolate', salmon: true, pasta: 'face'})
            .expect(200)
            .end(function(err, res) {
              if (err) { return done(err); }
              done();
            });
        });

        it('should return the modified resource', done => {
          const data = {
            id: 1,
            value: '10.20',
            date: '2015-12-12',
            description: 'chocolate'
          };

          request(app())
            .patch('/transactions/1')
            .set('Accept', 'application/json')
            .send({description: 'chocolate', salmon: true, pasta: 'face'})
            .expect(_.partial(responseValidation.dataEquals, data))
            .end(function(err, res) {
              if (err) { return done(err); }
              done();
            });
        });
      });
    });
  });

  describe('DELETE /transactions/:id', () => {
    describe("when the resource doesn't exist", () => {
      it('should return 404', done => {
        request(app())
          .delete('/transactions/1000')
          .set('Accept', 'application/json')
          .expect(404)
          .expect(_.partial(responseValidation.errorsEquals, [serverErrors.notFound.body()]))
          .end(function(err, res) {
            if (err) { return done(err); }
            done();
          });
      });
    });

    describe('when the resource exists', () => {
      beforeEach(() => {
        const db = pgp(dbConfig);

        const values = [
          {value: '10.20', date: '2016-12-12'},
          {value: '1000.20', description: 'test'}
        ];

        const query = getInsertQuery(values);
        return db.none(query[0], query[1]);
      });

      it('should return 204', done => {
        request(app())
          .delete('/transactions/1')
          .set('Accept', 'application/json')
          .expect(204)
          .expect(responseValidation.isEmpty)
          .end(function(err, res) {
            if (err) { return done(err); }
            done();
          });
      });
    });
  });

  describe('POST /transactions', () => {
    describe('when the request is empty, thus failing validation', () => {
      it('should return 400', done => {
        request(app())
          .post('/transactions')
          .set('Accept', 'application/json')
          .expect(400)
          .end(function(err, res) {
            if (err) { return done(err); }
            done();
          });
      });

      it('should return the correct error', done => {
        const errors = [{
          status: '400',
          title: 'Bad Request',
          detail: '"value" is required'
        }];

        request(app())
          .post('/transactions')
          .set('Accept', 'application/json')
          .expect(_.partial(responseValidation.errorsEquals, errors))
          .end(function(err, res) {
            if (err) { return done(err); }
            done();
          });
      });
    });

    describe('when the date fails validation', () => {
      it('should return 400', done => {
        request(app())
          .post('/transactions')
          .set('Accept', 'application/json')
          .send({value: '20.04', date: 'not a date'})
          .expect(400)
          .end(function(err, res) {
            if (err) { return done(err); }
            done();
          });
      });

      it('should return the correct error', done => {
        const errors = [{
          status: '400',
          title: 'Bad Request',
          detail: '"date" must be date format'
        }];

        request(app())
          .post('/transactions')
          .set('Accept', 'application/json')
          .send({value: '20.04', date: 'not a date'})
          .expect(_.partial(responseValidation.errorsEquals, errors))
          .end(function(err, res) {
            if (err) { return done(err); }
            done();
          });
      });
    });

    describe('when the request is valid', () => {
      it('should return 201', done => {
        request(app())
          .post('/transactions')
          .set('Accept', 'application/json')
          .send({value: '20.04', date: '2015-10-12'})
          .expect(201)
          .end(function(err, res) {
            if (err) { return done(err); }
            done();
          });
      });

      it('should return the created resource', done => {
        const data = {
          id: 1,
          value: '20.04',
          date: '2015-10-12',
          description: null
        };

        request(app())
          .post('/transactions')
          .set('Accept', 'application/json')
          .send({value: '20.04', date: '2015-10-12'})
          .expect(_.partial(responseValidation.dataEquals, data))
          .end(function(err, res) {
            if (err) { return done(err); }
            done();
          });
      });
    });
  });
});
