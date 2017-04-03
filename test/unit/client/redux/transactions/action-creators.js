import xhr from 'xhr';
import sinon from 'sinon';
import * as actionCreators from '../../../../../client-src/redux/transactions/action-creators';
import actionTypes from '../../../../../client-src/redux/transactions/action-types';

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
    it('should dispatch a begin action before making the request', () => {
      const thunk = actionCreators.createTransaction({label: 'pizza'});
      thunk(this.dispatch);
      expect(this.dispatch).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledWithExactly({
        type: actionTypes.CREATE_TRANSACTION
      });
      expect(this.dispatch).to.have.been.calledBefore(xhr.post);
    });

    it('should generate the expected request', () => {
      const thunk = actionCreators.createTransaction({label: 'pizza'});
      const req = thunk(this.dispatch);
      expect(req).to.be.instanceof(this.FakeXMLHttpRequest);
      expect(req.url).to.equal('/api/v1/transactions');
      expect(req.method).to.equal('POST');
      const expectedBody = JSON.stringify({label: 'pizza'});
      expect(req.requestBody).to.deep.equal(expectedBody);
    });

    it('should respond appropriately when there are no errors', () => {
      const thunk = actionCreators.createTransaction({label: 'pizza'});
      const req = thunk(this.dispatch);
      const respBody = JSON.stringify({
        data: {
          id: 10,
          label: 'pizza'
        }
      });
      req.respond(200, {}, respBody);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.CREATE_TRANSACTION_SUCCESS,
        transaction: {
          id: 10,
          label: 'pizza'
        }
      });
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.CREATE_TRANSACTION_FAILURE
      });
    });

    it('should respond appropriately when aborted', () => {
      const thunk = actionCreators.createTransaction({label: 'pizza'});
      const req = thunk(this.dispatch);
      req.abort();
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.CREATE_TRANSACTION
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.CREATE_TRANSACTION_ABORTED
      });
    });

    it('should respond appropriately when a error status code is returned', () => {
      const thunk = actionCreators.createTransaction({label: 'pizza'});
      const req = thunk(this.dispatch);
      req.respond(500);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.CREATE_TRANSACTION_SUCCESS,
        transaction: {
          id: 10,
          label: 'pizza'
        }
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.CREATE_TRANSACTION_FAILURE
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
    it('should dispatch a begin action before making the request', () => {
      const thunk = actionCreators.retrieveTransactions();
      thunk(this.dispatch);
      expect(this.dispatch).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledWithExactly({
        type: actionTypes.RETRIEVE_TRANSACTIONS
      });
      expect(this.dispatch).to.have.been.calledBefore(xhr.get);
    });

    it('should generate the expected request', () => {
      const thunk = actionCreators.retrieveTransactions();
      const req = thunk(this.dispatch);
      expect(req).to.be.instanceof(this.FakeXMLHttpRequest);
      expect(req.url).to.equal('/api/v1/transactions');
      expect(req.method).to.equal('GET');
    });

    it('should respond appropriately when there are no errors', () => {
      const thunk = actionCreators.retrieveTransactions();
      const req = thunk(this.dispatch);
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
        transactions: [
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
      const req = thunk(this.dispatch);
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
      const req = thunk(this.dispatch);
      req.respond(500);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.RETRIEVE_TRANSACTIONS_SUCCESS,
        transactions: undefined
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
        transactionId: 2
      });
    });
  });

  describe('updateTransaction', () => {
    it('should dispatch a begin action before making the request', () => {
      const thunk = actionCreators.updateTransaction({id: 10, label: 'pizza'});
      thunk(this.dispatch);
      expect(this.dispatch).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledWithExactly({
        type: actionTypes.UPDATE_TRANSACTION,
        transactionId: 10
      });
      expect(this.dispatch).to.have.been.calledBefore(xhr.patch);
    });

    it('should generate the expected request', () => {
      const thunk = actionCreators.updateTransaction({id: 2, label: 'pizza'});
      const req = thunk(this.dispatch);
      expect(req).to.be.instanceof(this.FakeXMLHttpRequest);
      expect(req.url).to.equal('/api/v1/transactions/2');
      expect(req.method).to.equal('PATCH');
      const expectedBody = JSON.stringify({id: 2, label: 'pizza'});
      expect(req.requestBody).to.deep.equal(expectedBody);
    });

    it('should respond appropriately when there are no errors', () => {
      const thunk = actionCreators.updateTransaction({id: 2, label: 'pizza'});
      const req = thunk(this.dispatch);
      const respBody = JSON.stringify({
        data: {
          id: 2,
          label: 'pizza'
        }
      });
      req.respond(200, {}, respBody);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.UPDATE_TRANSACTION_SUCCESS,
        transaction: {
          id: 2,
          label: 'pizza'
        }
      });
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.UPDATE_TRANSACTION_FAILURE,
        transactionId: 2
      });
    });

    it('should respond appropriately when aborted', () => {
      const thunk = actionCreators.updateTransaction({id: 2, label: 'pizza'});
      const req = thunk(this.dispatch);
      req.abort();
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.UPDATE_TRANSACTION,
        transactionId: 2
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.UPDATE_TRANSACTION_ABORTED,
        transactionId: 2
      });
    });

    it('should respond appropriately when a error status code is returned', () => {
      const thunk = actionCreators.updateTransaction({id: 2, label: 'pizza'});
      const req = thunk(this.dispatch);
      req.respond(500);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.UPDATE_TRANSACTION_SUCCESS,
        transaction: {
          id: 2,
          label: 'pizza'
        }
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.UPDATE_TRANSACTION_FAILURE,
        transactionId: 2
      });
    });
  });

  describe('deleteTransaction', () => {
    it('should dispatch a begin action before making the request', () => {
      const thunk = actionCreators.deleteTransaction(2);
      thunk(this.dispatch);
      expect(this.dispatch).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledWithExactly({
        type: actionTypes.DELETE_TRANSACTION,
        transactionId: 2
      });
      expect(this.dispatch).to.have.been.calledBefore(xhr.del);
    });

    it('should generate the expected request', () => {
      const thunk = actionCreators.deleteTransaction(2);
      const req = thunk(this.dispatch);
      expect(req).to.be.instanceof(this.FakeXMLHttpRequest);
      expect(req.url).to.equal('/api/v1/transactions/2');
      expect(req.method).to.equal('DELETE');
    });

    it('should respond appropriately when there are no errors', () => {
      const thunk = actionCreators.deleteTransaction(2);
      const req = thunk(this.dispatch);
      req.respond(200);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.DELETE_TRANSACTION_SUCCESS,
        transactionId: 2
      });
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.DELETE_TRANSACTION_FAILURE,
        transactionId: 2
      });
    });

    it('should respond appropriately when aborted', () => {
      const thunk = actionCreators.deleteTransaction(2);
      const req = thunk(this.dispatch);
      req.abort();
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.DELETE_TRANSACTION,
        transactionId: 2
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.DELETE_TRANSACTION_ABORTED,
        transactionId: 2
      });
    });

    it('should respond appropriately when a error status code is returned', () => {
      const thunk = actionCreators.deleteTransaction(2);
      const req = thunk(this.dispatch);
      req.respond(500);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.DELETE_TRANSACTION_SUCCESS,
        transactionId: 2
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.DELETE_TRANSACTION_FAILURE,
        transactionId: 2
      });
    });
  });
});
