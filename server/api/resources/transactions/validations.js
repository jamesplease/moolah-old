exports.create = {
  type: 'object',
  properties: {
    value: {
      required: true
    },
    date: {
      format: 'date'
    }
  }
};

exports.update = {
  type: 'object',
  properties: {
    date: {
      format: 'date'
    }
  }
};
