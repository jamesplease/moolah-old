import reducer from '../../../../../client/state/transactions/reducer';
import initialState from '../../../../../client/state/transactions/initial-state';
import actionTypes from '../../../../../client/state/transactions/action-types';

describe('transactions/reducer', function() {
  describe('An action with no type', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.deep.equal(initialState);
    });
  });

  describe('CREATE_TRANSACTION', () => {
    it('should return a new state with `creatingTransactionStatus` set to PENDING', () => {
      const state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}],
        creatingTransactionStatus: null
      };
      const action = {type: actionTypes.CREATE_TRANSACTION};
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}],
        creatingTransactionStatus: 'PENDING'
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('CREATE_TRANSACTION_SUCCESS', () => {
    it('should return a new state with `creatingTransactionStatus` set to SUCCESS and the transaction', () => {
      const state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      const action = {
        type: actionTypes.CREATE_TRANSACTION_SUCCESS,
        resource: {
          id: 4,
          pasta: 'yum'
        }
      };
      var newState = {
        resources: [
          {id: 1},
          {id: 2},
          {id: 3},
          {id: 4, pasta: 'yum'}
        ],
        resourcesMeta: [
          {id: 1},
          {id: 2},
          {id: 3},
          {id: 4, updatingStatus: null, isDeleting: false}
        ],
        creatingTransactionStatus: 'SUCCESS'
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('CREATE_TRANSACTION_FAILURE', () => {
    it('should return a new state with `creatingTransactionStatus` set to FAILURE', () => {
      const state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}],
        creatingTransactionStatus: 'PENDING'
      };
      const action = {type: actionTypes.CREATE_TRANSACTION_FAILURE};
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}],
        creatingTransactionStatus: 'FAILURE'
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('CREATE_TRANSACTION_ABORTED', () => {
    it('should return a new state with `creatingTransactionStatus` set to null', () => {
      const state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}],
        creatingTransactionStatus: 'PENDING'
      };
      const action = {type: actionTypes.CREATE_TRANSACTION_ABORTED};
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}],
        creatingTransactionStatus: null
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('CREATE_TRANSACTION_RESET_RESOLUTION', () => {
    it('should return a new state with `creatingTransactionStatus` set to null', () => {
      const state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}],
        creatingTransactionStatus: 'PENDING'
      };
      const action = {type: actionTypes.CREATE_TRANSACTION_RESET_RESOLUTION};
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}],
        creatingTransactionStatus: null
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('RETRIEVE_TRANSACTIONS', () => {
    it('should set `retrievingTransactionsStatus` to PENDING', () => {
      const state = {oink: true};
      const action = {type: actionTypes.RETRIEVE_TRANSACTIONS};
      var newState = {
        oink: true,
        retrievingTransactionsStatus: 'PENDING'
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('RETRIEVE_TRANSACTIONS_SUCCESS', () => {
    it('should set `retrievingTransactionsStatus` to SUCCESS while setting data', () => {
      const state = {oink: true};
      const action = {
        type: actionTypes.RETRIEVE_TRANSACTIONS_SUCCESS,
        resources: [{id: 2, name: 'pizza'}, {id: 5, name: 'sandwich'}]
      };
      var newState = {
        oink: true,
        resources: [{id: 2, name: 'pizza'}, {id: 5, name: 'sandwich'}],
        resourcesMeta: [
          {id: 2, updatingStatus: null, isDeleting: false},
          {id: 5, updatingStatus: null, isDeleting: false}
        ],
        retrievingTransactionsStatus: 'SUCCESS'
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('RETRIEVE_TRANSACTIONS_FAILURE', () => {
    it('should set `retrievingTransactionsStatus` to FAILURE', () => {
      const state = {oink: true};
      const action = {type: actionTypes.RETRIEVE_TRANSACTIONS_FAILURE};
      var newState = {
        oink: true,
        retrievingTransactionsStatus: 'FAILURE'
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('RETRIEVE_TRANSACTIONS_ABORTED', () => {
    it('should set `retrievingTransactionsStatus` to null', () => {
      const state = {oink: true};
      const action = {type: actionTypes.RETRIEVE_TRANSACTIONS_ABORTED};
      var newState = {
        oink: true,
        retrievingTransactionsStatus: null
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('RETRIEVE_TRANSACTIONS_RESET_RESOLUTION', () => {
    it('should set `retrievingTransactionsStatus` to null', () => {
      const state = {oink: true};
      const action = {type: actionTypes.RETRIEVE_TRANSACTIONS_RESET_RESOLUTION};
      var newState = {
        oink: true,
        retrievingTransactionsStatus: null
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('UPDATE_TRANSACTION', () => {
    it('should return a new state with `updatingStatus` set to PENDING for that transaction', () => {
      const state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      const action = {
        type: actionTypes.UPDATE_TRANSACTION,
        resource: {id: 2}
      };
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [
          {id: 1},
          {id: 2, updatingStatus: 'PENDING'},
          {id: 3}
        ]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('UPDATE_TRANSACTION_SUCCESS', () => {
    it('should return a new state with `updatingStatus` set to SUCCESS for that transaction', () => {
      const state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      const action = {
        type: actionTypes.UPDATE_TRANSACTION_SUCCESS,
        resource: {
          id: 2,
          pasta: 'yum'
        }
      };
      var newState = {
        resources: [
          {id: 1},
          {id: 2, pasta: 'yum'},
          {id: 3}
        ],
        resourcesMeta: [
          {id: 1},
          {id: 2, updatingStatus: 'SUCCESS'},
          {id: 3}
        ]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('UPDATE_TRANSACTION_FAILURE', () => {
    it('should return a new state with `updatingStatus` set to FAILURE for that transaction', () => {
      const state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      const action = {
        type: actionTypes.UPDATE_TRANSACTION_FAILURE,
        resource: {id: 2}
      };
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [
          {id: 1},
          {id: 2, updatingStatus: 'FAILURE'},
          {id: 3}
        ]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('UPDATE_TRANSACTION_ABORTED', () => {
    it('should return a new state with `updatingStatus` set to `null` for that transaction', () => {
      const state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [
          {id: 1},
          {id: 2, updatingStatus: 'FAILURE'},
          {id: 3}
        ]
      };
      const action = {
        type: actionTypes.UPDATE_TRANSACTION_ABORTED,
        resource: {id: 2}
      };
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [
          {id: 1},
          {id: 2, updatingStatus: null},
          {id: 3}
        ]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('UPDATE_TRANSACTION_RESET_RESOLUTION', () => {
    it('should return a new state with `updatingStatus` set to `null` for that transaction', () => {
      const state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [
          {id: 1},
          {id: 2, updatingStatus: 'FAILURE'},
          {id: 3}
        ]
      };
      const action = {
        type: actionTypes.UPDATE_TRANSACTION_RESET_RESOLUTION,
        resource: {id: 2}
      };
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [
          {id: 1},
          {id: 2, updatingStatus: null},
          {id: 3}
        ]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('DELETE_TRANSACTION', () => {
    let state, action;
    beforeEach(() => {
      state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      action = {
        type: actionTypes.DELETE_TRANSACTION,
        resource: {id: 2}
      };
    });

    it('should return a new state with `isDeleting` set to true for that transaction', () => {
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [
          {id: 1},
          {id: 2, isDeleting: true},
          {id: 3}
        ]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('DELETE_TRANSACTION_SUCCESS', () => {
    let state, action;
    beforeEach(() => {
      state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      action = {
        type: actionTypes.DELETE_TRANSACTION_SUCCESS,
        resource: {id: 2}
      };
    });

    it('should return a new state without the transaction in transactions', () => {
      var newState = {
        resources: [{id: 1}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 3}]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('DELETE_TRANSACTION_FAILURE', () => {
    let state, action;
    beforeEach(() => {
      state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      action = {
        type: actionTypes.DELETE_TRANSACTION_FAILURE,
        resource: {id: 2}
      };
    });

    it('should return a new state with `isDeleting` set to false for that transaction', () => {
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [
          {id: 1},
          {id: 2, isDeleting: false},
          {id: 3}
        ]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('DELETE_TRANSACTION_ABORTED', () => {
    let state, action;
    beforeEach(() => {
      state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      action = {
        type: actionTypes.DELETE_TRANSACTION_FAILURE,
        resource: {id: 2}
      };
    });

    it('should return a new state with `isDeleting` set to false for that transaction', () => {
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [
          {id: 1},
          {id: 2, isDeleting: false},
          {id: 3}
        ]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });
});
