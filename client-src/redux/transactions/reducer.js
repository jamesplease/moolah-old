import _ from 'lodash';
import actionTypes from './action-types';
import initialState from './initial-state';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TRANSACTION_UPDATE_ID: {
      return Object.assign({
        ...state,
        transactionIdBeingUpdated: action.transactionId
      });
    }

    case actionTypes.CLEAR_TRANSACTION_UPDATE_ID: {
      return Object.assign({
        ...state,
        transactionIdBeingUpdated: null
      });
    }

    // Create transaction
    case actionTypes.CREATE_TRANSACTION: {
      return Object.assign({
        ...state,
        creatingTransaction: true
      });
    }

    case actionTypes.CREATE_TRANSACTION_SUCCESS: {
      let transactions = [...state.transactions];
      transactions.push(action.transaction);
      return Object.assign({
        ...state,
        creatingTransaction: false,
        createTransactionSuccess: true,
        transactions
      });
    }

    case actionTypes.CREATE_TRANSACTION_FAILURE: {
      return Object.assign({
        ...state,
        creatingTransaction: false,
        createTransactionFailure: true
      });
    }

    case actionTypes.CREATE_TRANSACTION_DISMISS_SUCCESS_ALERT: {
      return Object.assign({
        ...state,
        createTransactionSuccess: false
      });
    }

    case actionTypes.CREATE_TRANSACTION_DISMISS_FAILURE_ALERT: {
      return Object.assign({
        ...state,
        createTransactionFailure: false
      });
    }

    // Retrieving transactions
    case actionTypes.RETRIEVE_TRANSACTIONS: {
      return Object.assign({
        ...state,
        retrievingTransactions: true
      });
    }

    case actionTypes.RETRIEVE_TRANSACTIONS_SUCCESS: {
      return Object.assign({
        ...state,
        retrievingTransactions: false,
        retrieveTransactionsSuccess: true,
        transactions: action.transactions
      });
    }

    case actionTypes.RETRIEVE_TRANSACTIONS_FAILURE: {
      return Object.assign({
        ...state,
        retrievingTransactions: false,
        retrieveTransactionsFailure: true
      });
    }

    case actionTypes.RETRIEVE_TRANSACTIONS_DISMISS_SUCCESS_ALERT: {
      return Object.assign({
        ...state,
        retrieveTransactionsSuccess: false
      });
    }

    case actionTypes.RETRIEVE_TRANSACTIONS_DISMISS_FAILURE_ALERT: {
      return Object.assign({
        ...state,
        retrieveTransactionsFailure: false
      });
    }

    // Update transaction
    case actionTypes.UPDATE_TRANSACTION: {
      return Object.assign({
        ...state,
        updatingTransaction: true,
      });
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

      return Object.assign({
        ...state,
        updatingTransaction: false,
        updateTransactionSuccess: true,
        transactions
      });
    }

    case actionTypes.UPDATE_TRANSACTION_FAILURE: {
      return Object.assign({
        ...state,
        updatingTransaction: false,
        updateTransactionFailure: true
      });
    }

    case actionTypes.UPDATE_TRANSACTION_DISMISS_SUCCESS_ALERT: {
      return Object.assign({
        ...state,
        updateTransactionSuccess: false
      });
    }

    case actionTypes.UPDATE_TRANSACTION_DISMISS_FAILURE_ALERT: {
      return Object.assign({
        ...state,
        updateTransactionFailure: false
      });
    }

    // Delete transaction
    case actionTypes.DELETE_TRANSACTION: {
      return Object.assign({
        ...state,
        deletingTransaction: true,
      });
    }

    case actionTypes.DELETE_TRANSACTION_SUCCESS: {
      const rejectionFn = val => val.id === action.transactionId;
      let transactions = _.reject(state.transactions, rejectionFn);
      return Object.assign({
        ...state,
        deletingTransaction: false,
        deleteTransactionSuccess: true,
        transactions
      });
    }

    case actionTypes.DELETE_TRANSACTION_FAILURE: {
      return Object.assign({
        ...state,
        deletingTransaction: false,
        deleteTransactionFailure: true,
      });
    }

    case actionTypes.DELETE_TRANSACTION_DISMISS_SUCCESS_ALERT: {
      return Object.assign({
        ...state,
        deleteTransactionSuccess: false
      });
    }

    case actionTypes.DELETE_TRANSACTION_DISMISS_FAILURE_ALERT: {
      return Object.assign({
        ...state,
        deleteTransactionFailure: false
      });
    }

    default: {
      return state;
    }
  }
};
