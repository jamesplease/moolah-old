/* eslint import/default: off */
import _ from 'lodash';
import data from './data';
import serverErrors from '../../../server/api/util/server-errors';

// This is used to filter out bad keys from requests that are
// sent over
const categoryKeys = ['id', 'label', 'emoji'];

// We calculate the `lastId` so that new resources that are created
// have unique IDs
let lastId = data[data.length - 1].id;

export default function register(server) {
  server.respondWith(
    'GET',
    '/api/v1/categories',
    (req) => {
      req.respond(
        200,
        {'Content-Type': 'application/json'},
        JSON.stringify(data)
      );
    }
  );

  server.respondWith(
    'POST',
    '/api/v1/categories',
    (req) => {
      const json = JSON.parse(req.requestBody);
      const newCategory = {
        ...(_.pick(json, categoryKeys)),
        id: ++lastId
      };

      const jsonResponse = JSON.stringify(newCategory);
      req.respond(
        201,
        {'Content-Type': 'application/json'},
        jsonResponse
      );
    }
  );

  server.respondWith(
    'PATCH',
    /\/api\/v1\/categories\/(\d+)/,
    (req, id) => {
      const category = _.find(data, {id: parseInt(id)});
      if (!category) {
        const err = serverErrors.notFound.body();
        req.respond(
          404,
          {'Content-Type': 'application/json'},
          JSON.stringify(err)
        );
      } else {
        const json = JSON.parse(req.requestBody);
        const newCategory = {
          ...category,
          ...(_.pick(json, categoryKeys))
        };

        const jsonResponse = JSON.stringify(newCategory);
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
    /\/api\/v1\/categories\/(\d+)/,
    (req, id) => {
      const category = _.find(data, {id: parseInt(id)});
      if (!category) {
        const err = serverErrors.notFound.body();
        req.respond(
          404,
          {'Content-Type': 'application/json'},
          JSON.stringify(err)
        );
      } else {
        req.respond(204);
      }
    }
  );
}
