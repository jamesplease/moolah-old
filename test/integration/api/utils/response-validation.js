import _ from 'lodash';

// These are a collection of utility methods for checking the
// response of a request to the API. They're part of the API
// as specified by supertest. For more, see:
// https://github.com/visionmedia/supertest#expectfunctionres-

function hasAttr(attr, res) {
  if (!(attr in res.body)) {
    throw new Error(`Response missing "${attr}" attribute.`);
  }
}

function doesNotHaveAttr(attr, res) {
  if (attr in res.body) {
    throw new Error(`Response has "${attr}" attribute.`);
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
    return new Error('The data did not match.');
  }
}

function errorsEquals(obj, res) {
  if (!_.isEqual(res.body.errors, obj)) {
    return new Error('The errors did not match.');
  }
}

function isEmpty(res) {
  if (_.size(res.body)) {
    return new Error('Response body was not empty.');
  }
}

export default {
  hasAttr,
  doesNotHaveAttr,
  dataIsArray,
  dataIsSingleObj,
  dataEquals,
  errorsEquals,
  isEmpty
};
