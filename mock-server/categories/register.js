/* eslint import/default: off */
import _ from 'lodash';
import data from './data';
import serverErrors from '../../server/api/util/server-errors';

let mockData = _.cloneDeep(data);

// This is used to filter out bad keys from requests that are
// sent over
const validAttrs = ['id', 'label', 'emoji'];

// We calculate the `lastId` so that new resources that are created
// have unique IDs
let lastId = mockData[mockData.length - 1].id;

export default function register(server) {
  server.respondWith(
    'GET',
    '/api/v1/categories',
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
    '/api/v1/categories',
    (req) => {
      const json = JSON.parse(req.requestBody);
      const newCategory = {
        ...(_.pick(json, validAttrs)),
        id: ++lastId
      };

      mockData.push(newCategory);

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
      const category = _.find(mockData, {id: parseInt(id)});
      if (!category) {
        const err = serverErrors.notFound.body();
        req.respond(
          404,
          {'Content-Type': 'application/json'},
          JSON.stringify(err)
        );
      } else {
        const json = JSON.parse(req.requestBody);
        Object.assign(category, _.pick(json, validAttrs));

        const jsonResponse = JSON.stringify(category);
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
      id = parseInt(id);
      const category = _.find(mockData, {id});
      if (!category) {
        const err = serverErrors.notFound.body();
        req.respond(
          404,
          {'Content-Type': 'application/json'},
          JSON.stringify(err)
        );
      } else {
        // Delete this category from our mock data
        mockData = _.reject(mockData, {id});
        req.respond(204);
      }
    }
  );
}
