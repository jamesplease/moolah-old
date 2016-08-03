/* eslint import/default: off */
import _ from 'lodash';
import data from './data';
import serverErrors from '../../../server/api/util/server-errors';

let mockData = _.cloneDeep(data);

const validAttrs = ['id', 'description', 'value', 'date'];
let lastId = mockData[mockData.length - 1].id;

export default function register(server) {
  server.respondWith(
    'GET',
    '/api/v1/transactions',
    (req) => {
      req.respond(
        200,
        {'Content-Type': 'application/json'},
        JSON.stringify(mockData)
      );
    }
  );

  server.respondWith(
    'POST',
    '/api/v1/transactions',
    (req) => {
      const json = JSON.parse(req.requestBody);
      const newTransaction = {
        ...(_.pick(json, validAttrs)),
        id: ++lastId
      };

      mockData.push(newTransaction);

      const jsonResponse = JSON.stringify(newTransaction);
      req.respond(
        201,
        {'Content-Type': 'application/json'},
        jsonResponse
      );
    }
  );

  server.respondWith(
    'PATCH',
    /\/api\/v1\/transactions\/(\d+)/,
    (req, id) => {
      const transaction = _.find(mockData, {id: parseInt(id)});
      if (!transaction) {
        const err = serverErrors.notFound.body();
        req.respond(
          404,
          {'Content-Type': 'application/json'},
          JSON.stringify(err)
        );
      } else {
        const json = JSON.parse(req.requestBody);
        Object.assign(transaction, _.pick(json, validAttrs));

        const jsonResponse = JSON.stringify(transaction);
        req.respond(
          200,
          {'Content-Type': 'application/json'},
          jsonResponse
        );
      }
    }
  );

  server.respondWith(
    'DELETE',
    /\/api\/v1\/transactions\/(\d+)/,
    (req, id) => {
      id = parseInt(id);
      const transaction = _.find(mockData, {id});
      if (!transaction) {
        const err = serverErrors.notFound.body();
        req.respond(
          404,
          {'Content-Type': 'application/json'},
          JSON.stringify(err)
        );
      } else {
        // Delete this transaction from our mock data
        mockData = _.reject(mockData, {id});
        req.respond(204);
      }
    }
  );
}
