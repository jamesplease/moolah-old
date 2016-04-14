'use strict';

const requireId = {
  anyOf: [
    { type: 'integer' },
    {
      type: 'string',
      pattern: '^[0-9]+$'
    }
  ],
  required: true
};

exports.create = {
  type: 'object',
  required: true,
  properties: {
    body: {
      type: 'object',
      properties: {
        value: {
          required: true
        },
        date: {
          format: 'date'
        }
      }
    }
  }
};

exports.readOne = {
  type: 'object',
  required: true,
  properties: {
    type: 'object',
    required: true,
    params: {
      properties: {
        id: requireId
      }
    }
  }
};

exports.update = {
  type: 'object',
  required: true,
  properties: {
    body: {
      type: 'object',
      properties: {
        date: {
          format: 'date'
        }
      }
    }
  }
};

exports.destroy = {
  type: 'object',
  required: true,
  properties: {
    params: {
      type: 'object',
      required: true,
      properties: {
        id: requireId
      }
    }
  }
};
