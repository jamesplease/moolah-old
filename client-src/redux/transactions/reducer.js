import _ from 'lodash';
import actionTypes from './action-types';
import initialState from './initial-state';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TRANSACTION_UPDATE_ID: {
      return {
        ...state,
        transactionIdBeingUpdated: action.transactionId
      };
    }

    case actionTypes.CLEAR_TRANSACTION_UPDATE_ID: {
      return {
        ...state,
        transactionIdBeingUpdated: null
      };
    }

    // Create transaction
    case actionTypes.CREATE_TRANSACTION: {
      return {
        ...state,
        creatingTransaction: true
      };
    }

    case actionTypes.CREATE_TRANSACTION_SUCCESS: {
      let transactions = [...state.transactions];
      transactions.push(action.transaction);
      return {
        ...state,
        creatingTransaction: false,
        createTransactionSuccess: true,
        transactions
      };
    }

    case actionTypes.CREATE_TRANSACTION_FAILURE: {
      return {
        ...state,
        creatingTransaction: false,
        createTransactionFailure: true
      };
    }

    case actionTypes.CREATE_TRANSACTION_RESET_RESOLUTION: {
      return {
        ...state,
        createTransactionSuccess: false,
        createTransactionFailure: false
      };
    }

    // Retrieving transactions
    case actionTypes.RETRIEVE_TRANSACTIONS: {
      return {
        ...state,
        retrievingTransactions: true
      };
    }

    case actionTypes.RETRIEVE_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        retrievingTransactions: false,
        retrieveTransactionsSuccess: true,
        transactions: action.transactions
      };
    }

    case actionTypes.RETRIEVE_TRANSACTIONS_FAILURE: {
      return {
        ...state,
        retrievingTransactions: false,
        retrieveTransactionsFailure: true
      };
    }

    case actionTypes.RETRIEVE_TRANSACTIONS_RESET_RESOLUTION: {
      return {
        ...state,
        retrieveTransactionsSuccess: false,
        retrieveTransactionsFailure: false
      };
    }

    // Update transaction
    case actionTypes.UPDATE_TRANSACTION: {
      return {
        ...state,
        updatingTransaction: true,
      };
    }

    case actionTypes.UPDATE_TRANSACTION_SUCCESS: {
      let id = action.transaction.id;

      let transactions = ([...state.transactions]).map(t => {
        if (t.id !== id) {
          return t;
        } else {
          return action.transaction;
        }
      });

      return {
        ...state,
        updatingTransaction: false,
        updateTransactionSuccess: true,
        transactions
      };
    }

    case actionTypes.UPDATE_TRANSACTION_FAILURE: {
      return {
        ...state,
        updatingTransaction: false,
        updateTransactionFailure: true
      };
    }

    case actionTypes.UPDATE_TRANSACTION_RESET_RESOLUTION: {
      return {
        ...state,
        updateTransactionSuccess: false,
        updateTransactionFailure: false
      };
    }

    // Delete transaction
    case actionTypes.DELETE_TRANSACTION: {
      return {
        ...state,
        deletingTransaction: true,
      };
    }

    case actionTypes.DELETE_TRANSACTION_SUCCESS: {
      const rejectionFn = val => val.id === action.transactionId;
      let transactions = _.reject(state.transactions, rejectionFn);
      return {
        ...state,
        deletingTransaction: false,
        deleteTransactionSuccess: true,
        transactions
      };
    }

    case actionTypes.DELETE_TRANSACTION_FAILURE: {
      return {
        ...state,
        deletingTransaction: false,
        deleteTransactionFailure: true,
      };
    }

    case actionTypes.DELETE_TRANSACTION_RESET_RESOLUTION: {
      return {
        ...state,
        deleteTransactionSuccess: false,
        deleteTransactionFailure: false
      };
    }

    default: {
      return state;
    }
  }
};
