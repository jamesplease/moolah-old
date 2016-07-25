'use strict';

module.exports = {
  notFound: {
    code: 404,
    body() {
      return {
        title: 'Server Error',
        detail: 'There was an error while processing your request'
      };
    }
  },

  generic: {
    code: 500,
    body() {
      return {
        title: 'Server Error',
        detail: 'There was an error while processing your request'
      };
    }
  }
};
