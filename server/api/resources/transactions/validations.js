exports.create = {
  type: 'object',
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

exports.update = {
  type: 'object',
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
