'use strict';

// The `code` in each error is duplicated because I don't think it's
// worthwhile to write a introduce an abstraction for it. It would
// DRY it up at the expense of how simple it is to read this file
// to at a glance see the code of the response is, and its body.
module.exports = {
  notFound: {
    code: 404,
    body() {
      return {
        code: '404',
        title: 'Server Error',
        detail: 'There was an error while processing your request'
      };
    }
  },

  generic: {
    code: 500,
    body() {
      return {
        code: '500',
        title: 'Server Error',
        detail: 'There was an error while processing your request'
      };
    }
  }
};
