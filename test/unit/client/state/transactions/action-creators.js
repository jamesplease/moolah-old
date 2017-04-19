import xhr from 'xhr';
import sinon from 'sinon';
import * as actionCreators from '../../../../../client/state/transactions/action-creators';
import actionTypes from '../../../../../client/state/transactions/action-types';

describe('transactions/actionCreators', function() {
  beforeEach(() => {
    useFakeXMLHttpRequest();
    xhr.XMLHttpRequest = sinon.FakeXMLHttpRequest;
    this.FakeXMLHttpRequest = sinon.FakeXMLHttpRequest;
    this.dispatch = stub();
    spy(xhr);
  });

  describe('resetCreateTransactionResolution', () => {
    it('should return the right action', () => {
      const result = actionCreators.resetCreateTransactionResolution();
      expect(result).to.deep.equal({
        type: actionTypes.CREATE_TRANSACTION_RESET_RESOLUTION
      });
    });
  });

  describe('createTransaction', () => {
    beforeEach(() => {
      this.getState = function() {
        return {
          auth: {
            user: {
              id: 100
            }
          },
          transactions: {
            resources: [
              {id: 2, type: 'transactions', attributes: {label: 'pizza'}},
              {id: 10, type: 'transactions', attributes: {label: 'what'}}
            ]
          }
        };
      };
    });

    afterEach(() => {
      this.getState = null;
    });

    it('should dispatch a begin action before making the request', () => {
      const thunk = actionCreators.createTransaction({attributes: {label: 'pizza'}});
      thunk(this.dispatch, this.getState);
      expect(this.dispatch).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledWithExactly({
        type: actionTypes.CREATE_TRANSACTION,
        resource: {
          type: 'transactions',
          attributes: {
            label: 'pizza',
            user: 100
          }
        }
      });
      expect(this.dispatch).to.have.been.calledBefore(xhr.post);
    });

    it('should generate the expected request', () => {
      const thunk = actionCreators.createTransaction({attributes: {label: 'pizza'}});
      const req = thunk(this.dispatch, this.getState);
      expect(req).to.be.instanceof(this.FakeXMLHttpRequest);
      expect(req.url).to.equal('/api/transactions');
      expect(req.method).to.equal('POST');
      const expectedBody = JSON.stringify({
        data: {
          attributes: {
            label: 'pizza',
            user: 100
          },
          type: 'transactions',
        }
      });
      expect(req.requestBody).to.deep.equal(expectedBody);
    });

    it('should respond appropriately when there are no errors', () => {
      const thunk = actionCreators.createTransaction({attributes: {label: 'pizza'}});
      const req = thunk(this.dispatch, this.getState);
      const respBody = JSON.stringify({
        data: {
          id: 10,
          attributes: {
            label: 'pizza',
            user: 100
          }
        }
      });
      req.respond(200, {}, respBody);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.CREATE_TRANSACTION_SUCCESS,
        resource: {
          id: 10,
          attributes: {
            label: 'pizza',
            user: 100
          }
        }
      });
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.CREATE_TRANSACTION_FAILURE
      });
    });

    it('should respond appropriately when aborted', () => {
      const thunk = actionCreators.createTransaction({attributes: {label: 'pizza'}});
      const req = thunk(this.dispatch, this.getState);
      req.abort();
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.CREATE_TRANSACTION,
        resource: {
          type: 'transactions',
          attributes: {
            label: 'pizza',
            user: 100
          }
        }
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.CREATE_TRANSACTION_ABORTED,
        resource: {
          type: 'transactions',
          attributes: {
            label: 'pizza',
            user: 100
          }
        }
      });
    });

    it('should respond appropriately when a error status code is returned', () => {
      const thunk = actionCreators.createTransaction({attributes: {label: 'pizza'}});
      const req = thunk(this.dispatch, this.getState);
      req.respond(500);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.CREATE_TRANSACTION_SUCCESS,
        resource: {
          type: 'transactions',
          attributes: {
            label: 'pizza',
            user: 100
          }
        }
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.CREATE_TRANSACTION_FAILURE,
        resource: {
          type: 'transactions',
          attributes: {
            label: 'pizza',
            user: 100
          }
        }
      });
    });
  });

  describe('resetRetrieveTransactionsResolution', () => {
    it('should return the right action', () => {
      const result = actionCreators.resetRetrieveTransactionsResolution();
      expect(result).to.deep.equal({
        type: actionTypes.RETRIEVE_TRANSACTIONS_RESET_RESOLUTION
      });
    });
  });

  describe('retrieveTransactions', () => {
    beforeEach(() => {
      this.getState = function() {
        return {
          auth: {
            user: {
              id: 100
            }
          },
          transactions: {
            resources: [
              {id: 2, type: 'transactions', attributes: {label: 'pizza'}},
              {id: 10, type: 'transactions', attributes: {label: 'what'}}
            ]
          }
        };
      };
    });

    afterEach(() => {
      this.getState = null;
    });

    it('should dispatch a begin action before making the request', () => {
      const thunk = actionCreators.retrieveTransactions();
      thunk(this.dispatch, this.getState);
      expect(this.dispatch).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledWithExactly({
        type: actionTypes.RETRIEVE_TRANSACTIONS
      });
      expect(this.dispatch).to.have.been.calledBefore(xhr.get);
    });

    it('should generate the expected request', () => {
      const thunk = actionCreators.retrieveTransactions();
      const req = thunk(this.dispatch, this.getState);
      expect(req).to.be.instanceof(this.FakeXMLHttpRequest);
      expect(req.url).to.equal('/api/transactions?filter[user]=100');
      expect(req.method).to.equal('GET');
    });

    it('should respond appropriately when there are no errors', () => {
      const thunk = actionCreators.retrieveTransactions();
      const req = thunk(this.dispatch, this.getState);
      const respBody = JSON.stringify({
        data: [
          {id: 1},
          {id: 2}
        ]
      });
      req.respond(200, {}, respBody);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.RETRIEVE_TRANSACTIONS_SUCCESS,
        resources: [
          {id: 1},
          {id: 2}
        ]
      });
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.RETRIEVE_TRANSACTIONS_FAILURE
      });
    });

    it('should respond appropriately when aborted', () => {
      const thunk = actionCreators.retrieveTransactions();
      const req = thunk(this.dispatch, this.getState);
      req.abort();
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.RETRIEVE_TRANSACTIONS
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.RETRIEVE_TRANSACTIONS_ABORTED
      });
    });

    it('should respond appropriately when a error status code is returned', () => {
      const thunk = actionCreators.retrieveTransactions();
      const req = thunk(this.dispatch, this.getState);
      req.respond(500);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.RETRIEVE_TRANSACTIONS_SUCCESS,
        resources: undefined
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.RETRIEVE_TRANSACTIONS_FAILURE
      });
    });
  });

  describe('resetUpdateTransactionResolution', () => {
    it('should return the right action', () => {
      const result = actionCreators.resetUpdateTransactionResolution(2);
      expect(result).to.deep.equal({
        type: actionTypes.UPDATE_TRANSACTION_RESET_RESOLUTION,
        resourceId: 2
      });
    });
  });

  describe('updateTransaction', () => {
    beforeEach(() => {
      this.getState = function() {
        return {
          transactions: {
            resources: [
              {id: 2, type: 'transactions', attributes: {label: 'pizza'}},
              {id: 10, type: 'transactions', attributes: {label: 'what'}}
            ]
          }
        };
      };
    });

    afterEach(() => {
      this.getState = null;
    });

    it('should dispatch a begin action before making the request', () => {
      const thunk = actionCreators.updateTransaction({id: 10, attributes: {label: 'pizza'}});
      thunk(this.dispatch, this.getState);
      expect(this.dispatch).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledWithExactly({
        type: actionTypes.UPDATE_TRANSACTION,
        resource: {
          type: 'transactions',
          id: 10,
          attributes: {label: 'pizza'}
        }
      });
      expect(this.dispatch).to.have.been.calledBefore(xhr.patch);
    });

    it('should generate the expected request', () => {
      const thunk = actionCreators.updateTransaction({id: 2, attributes: {label: 'pizza'}});
      const req = thunk(this.dispatch, this.getState);
      expect(req).to.be.instanceof(this.FakeXMLHttpRequest);
      expect(req.url).to.equal('/api/transactions/2');
      expect(req.method).to.equal('PATCH');
      const expectedBody = JSON.stringify({
        data: {
          id: 2,
          attributes: {
            label: 'pizza'
          },
          type: 'transactions',
        }
      });
      expect(req.requestBody).to.deep.equal(expectedBody);
    });

    it('should respond appropriately when there are no errors', () => {
      const thunk = actionCreators.updateTransaction({id: 2, attributes: {label: 'pizza'}});
      const req = thunk(this.dispatch, this.getState);
      const respBody = JSON.stringify({
        data: {
          id: 2,
          attributes: {
            label: 'pizza'
          },
          type: 'transactions'
        }
      });
      req.respond(200, {}, respBody);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.UPDATE_TRANSACTION_SUCCESS,
        resource: {
          id: 2,
          type: 'transactions',
          attributes: {
            label: 'pizza'
          }
        }
      });
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.UPDATE_TRANSACTION_FAILURE,
        resource: {
          id: 2,
          type: 'transactions',
          attributes: {
            label: 'pizza'
          }
        }
      });
    });

    it('should respond appropriately when aborted', () => {
      const thunk = actionCreators.updateTransaction({id: 2, attributes: {label: 'pizza'}});
      const req = thunk(this.dispatch, this.getState);
      req.abort();
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.UPDATE_TRANSACTION,
        resource: {
          type: 'transactions',
          id: 2,
          attributes: {label: 'pizza'}
        }
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.UPDATE_TRANSACTION_ABORTED,
        resource: {
          type: 'transactions',
          id: 2,
          attributes: {label: 'pizza'}
        }
      });
    });

    it('should respond appropriately when a error status code is returned', () => {
      const thunk = actionCreators.updateTransaction({id: 2, attributes: {label: 'pizza'}});
      const req = thunk(this.dispatch, this.getState);
      req.respond(500);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.UPDATE_TRANSACTION_SUCCESS,
        resource: {
          id: 2,
          type: 'transactions',
          attributes: {
            label: 'pizza'
          }
        }
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.UPDATE_TRANSACTION_FAILURE,
        resource: {
          id: 2,
          type: 'transactions',
          attributes: {
            label: 'pizza'
          }
        }
      });
    });
  });

  describe('deleteTransaction', () => {
    beforeEach(() => {
      this.getState = function() {
        return {
          transactions: {
            resources: [
              {id: 2, type: 'transactions', attributes: {label: 'pizza'}},
              {id: 10, type: 'transactions', attributes: {label: 'what'}}
            ]
          }
        };
      };
    });

    afterEach(() => {
      this.getState = null;
    });

    it('should dispatch a begin action before making the request', () => {
      const thunk = actionCreators.deleteTransaction(2);
      thunk(this.dispatch, this.getState);
      expect(this.dispatch).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledWithExactly({
        type: actionTypes.DELETE_TRANSACTION,
        resource: {
          id: 2, type: 'transactions', attributes: {label: 'pizza'}
        }
      });
      expect(this.dispatch).to.have.been.calledBefore(xhr.del);
    });

    it('should generate the expected request', () => {
      const thunk = actionCreators.deleteTransaction(2);
      const req = thunk(this.dispatch, this.getState);
      expect(req).to.be.instanceof(this.FakeXMLHttpRequest);
      expect(req.url).to.equal('/api/transactions/2');
      expect(req.method).to.equal('DELETE');
    });

    it('should respond appropriately when there are no errors', () => {
      const thunk = actionCreators.deleteTransaction(2);
      const req = thunk(this.dispatch, this.getState);
      req.respond(200);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.DELETE_TRANSACTION_SUCCESS,
        resource: {id: 2, type: 'transactions', attributes: {label: 'pizza'}}
      });
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.DELETE_TRANSACTION_FAILURE,
        resource: {id: 2, type: 'transactions', attributes: {label: 'pizza'}}
      });
    });

    it('should respond appropriately when aborted', () => {
      const thunk = actionCreators.deleteTransaction(2);
      const req = thunk(this.dispatch, this.getState);
      req.abort();
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.DELETE_TRANSACTION,
        resource: {id: 2, type: 'transactions', attributes: {label: 'pizza'}}
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.DELETE_TRANSACTION_ABORTED,
        resource: {id: 2, type: 'transactions', attributes: {label: 'pizza'}}
      });
    });

    it('should respond appropriately when a error status code is returned', () => {
      const thunk = actionCreators.deleteTransaction(2);
      const req = thunk(this.dispatch, this.getState);
      req.respond(500);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.DELETE_TRANSACTION_SUCCESS,
        resource: {id: 2, type: 'transactions', attributes: {label: 'pizza'}}
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.DELETE_TRANSACTION_FAILURE,
        resource: {id: 2, type: 'transactions', attributes: {label: 'pizza'}}
      });
    });
  });
});
