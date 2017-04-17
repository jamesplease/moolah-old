import _ from 'lodash';
import actionTypes from './action-types';
import initialState from './initial-state';

const initialResourceMetaState = {
  updatingStatus: null,
  isDeleting: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Create transaction
    case actionTypes.CREATE_TRANSACTION: {
      return {
        ...state,
        creatingTransactionStatus: 'PENDING'
      };
    }

    case actionTypes.CREATE_TRANSACTION_SUCCESS: {
      let transactions = [...state.transactions];
      transactions.push(action.transaction);
      const transactionsMeta = [
        ...state.transactionsMeta,
        {
          id: action.transaction.id,
          ...initialResourceMetaState
        }
      ];
      return {
        ...state,
        creatingTransactionStatus: 'SUCCESS',
        transactions,
        transactionsMeta
      };
    }

    case actionTypes.CREATE_TRANSACTION_FAILURE: {
      return {
        ...state,
        creatingTransactionStatus: 'FAILURE'
      };
    }

    case actionTypes.CREATE_TRANSACTION_ABORTED:
    case actionTypes.CREATE_TRANSACTION_RESET_RESOLUTION: {
      return {
        ...state,
        creatingTransactionStatus: null
      };
    }

    // Retrieving transactions
    case actionTypes.RETRIEVE_TRANSACTIONS: {
      return {
        ...state,
        retrievingTransactionsStatus: 'PENDING'
      };
    }

    case actionTypes.RETRIEVE_TRANSACTIONS_SUCCESS: {
      const transactionsMeta = action.transactions.map(c => {
        return {
          id: c.id,
          ...initialResourceMetaState
        };
      });

      return {
        ...state,
        retrievingTransactionsStatus: 'SUCCESS',
        transactions: [...action.transactions],
        transactionsMeta
      };
    }

    case actionTypes.RETRIEVE_TRANSACTIONS_FAILURE: {
      return {
        ...state,
        retrievingTransactionsStatus: 'FAILURE'
      };
    }

    case actionTypes.RETRIEVE_TRANSACTIONS_ABORTED:
    case actionTypes.RETRIEVE_TRANSACTIONS_RESET_RESOLUTION: {
      return {
        ...state,
        retrievingTransactionsStatus: null
      };
    }

    // Update transaction
    case actionTypes.UPDATE_TRANSACTION: {
      const transactionsMeta = state.transactionsMeta.map(c => {
        if (c.id !== action.transactionId) {
          return {...c};
        } else {
          return {
            ...c,
            updatingStatus: 'PENDING'
          };
        }
      });

      return {
        ...state,
        transactionsMeta
      };
    }

    case actionTypes.UPDATE_TRANSACTION_SUCCESS: {
      let id = action.transaction.id;

      let transactions = state.transactions.map(c => {
        if (c.id !== id) {
          return {...c};
        } else {
          return {...action.transaction};
        }
      });

      const transactionsMeta = state.transactionsMeta.map(c => {
        if (c.id !== id) {
          return {...c};
        } else {
          return {
            ...c,
            updatingStatus: 'SUCCESS'
          };
        }
      });

      return {
        ...state,
        transactions,
        transactionsMeta
      };
    }

    case actionTypes.UPDATE_TRANSACTION_FAILURE: {
      const transactionsMeta = state.transactionsMeta.map(c => {
        if (c.id !== action.transactionId) {
          return {...c};
        } else {
          return {
            ...c,
            updatingStatus: 'FAILURE'
          };
        }
      });

      return {
        ...state,
        transactionsMeta
      };
    }

    case actionTypes.UPDATE_TRANSACTION_ABORTED:
    case actionTypes.UPDATE_TRANSACTION_RESET_RESOLUTION: {
      const clonedMeta = _.cloneDeep(state.transactionsMeta);
      const transactionsMeta = clonedMeta.map(c => {
        if (c.id !== action.transactionId) {
          return {...c};
        } else {
          return {
            ...c,
            updatingStatus: null
          };
        }
      });

      return {
        ...state,
        transactionsMeta
      };
    }

    // Delete transaction
    case actionTypes.DELETE_TRANSACTION: {
      const clonedMeta = _.cloneDeep(state.transactionsMeta);
      const transactionsMeta = clonedMeta.map(c => {
        if (c.id !== action.transactionId) {
          return c;
        } else {
          return {
            ...c,
            isDeleting: c.id === action.transactionId
          };
        }
      });

      return {
        ...state,
        transactionsMeta
      };
    }

    case actionTypes.DELETE_TRANSACTION_SUCCESS: {
      const rejectionFn = val => val.id === action.transactionId;
      const clonedTransactions = _.cloneDeep(state.transactions);
      const clonedMeta = _.cloneDeep(state.transactionsMeta);

      let transactions = _.reject(clonedTransactions, rejectionFn);
      let transactionsMeta = _.reject(clonedMeta, rejectionFn);
      return {
        ...state,
        transactions,
        transactionsMeta
      };
    }

    case actionTypes.DELETE_TRANSACTION_FAILURE:
    case actionTypes.DELETE_TRANSACTION_ABORTED: {
      const clonedMeta = _.cloneDeep(state.transactionsMeta);
      const transactionsMeta = clonedMeta.map(c => {
        if (c.id !== action.transactionId) {
          return c;
        } else {
          return {
            ...c,
            isDeleting: false
          };
        }
      });

      return {
        ...state,
        transactionsMeta
      };
    }

    default: {
      return state;
    }
  }
};
