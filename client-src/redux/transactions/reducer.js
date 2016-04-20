import _ from 'lodash';
import actionTypes from './action-types';
import initialState from './initial-state';

export default (state = initialState, action) => {
  switch (action.type) {
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

    case actionTypes.DISMISS_CREATE_TRANSACTION_SUCCESS_ALERT: {
      return Object.assign({
        ...state,
        createTransactionSuccess: false
      });
    }

    case actionTypes.DISMISS_CREATE_TRANSACTION_FAILURE_ALERT: {
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

    case actionTypes.DISMISS_RETRIEVE_TRANSACTIONS_SUCCESS_ALERT: {
      return Object.assign({
        ...state,
        retrieveTransactionsSuccess: false
      });
    }

    case actionTypes.DISMISS_RETRIEVE_TRANSACTIONS_FAILURE_ALERT: {
      return Object.assign({
        ...state,
        retrieveTransactionsFailure: false
      });
    }

    // Update transaction
    case actionTypes.UPDATE_TRANSACTION: {
      let currentlyUpdating = [...state.currentlyUpdating];
      currentlyUpdating.push(action.transactionId);
      return Object.assign({
        ...state,
        updatingTransaction: true,
        currentlyUpdating
      });
    }

    case actionTypes.UPDATE_TRANSACTION_SUCCESS: {
      let current = state.currentlyUpdating;
      let id = action.transactionId;
      let currentlyUpdating = _.without(current, id);
      currentlyUpdating.push(action.transaction);
      return Object.assign({
        ...state,
        updatingTransaction: false,
        updateTransactionSuccess: true,
        currentlyUpdating
      });
    }

    case actionTypes.UPDATE_TRANSACTION_FAILURE: {
      let current = state.currentlyUpdating;
      let id = action.transactionId;
      let currentlyUpdating = _.without(current, id);
      return Object.assign({
        ...state,
        updatingTransaction: false,
        updateTransactionFailure: true,
        currentlyUpdating
      });
    }

    case actionTypes.DISMISS_UPDATE_TRANSACTION_SUCCESS_ALERT: {
      return Object.assign({
        ...state,
        updateTransactionSuccess: false
      });
    }

    case actionTypes.DISMISS_UPDATE_TRANSACTION_FAILURE_ALERT: {
      return Object.assign({
        ...state,
        updateTransactionFailure: false
      });
    }

    // Delete transaction
    case actionTypes.DELETE_TRANSACTION: {
      let currentlyDeleting = [...state.currentlyDeleting];
      currentlyDeleting.push(action.transactionId);
      return Object.assign({
        ...state,
        deletingTransaction: true,
        currentlyDeleting
      });
    }

    case actionTypes.DELETE_TRANSACTION_SUCCESS: {
      let current = state.currentlyDeleting;
      let id = action.transactionId;
      let currentlyDeleting = _.without(current, id);
      currentlyDeleting.push(action.transaction);

      const rejectionFn = val => val.id === action.transactionId;
      let transactions = _.reject(state.transactions, rejectionFn);
      return Object.assign({
        ...state,
        deletingTransaction: false,
        deleteTransactionSuccess: true,
        currentlyDeleting,
        transactions
      });
    }

    case actionTypes.DELETE_TRANSACTION_FAILURE: {
      let current = state.currentlyDeleting;
      let id = action.transactionId;
      let currentlyDeleting = _.without(current, id);
      return Object.assign({
        ...state,
        deletingTransaction: false,
        deleteTransactionFailure: true,
        currentlyDeleting
      });
    }

    case actionTypes.DISMISS_DELETE_TRANSACTION_SUCCESS_ALERT: {
      return Object.assign({
        ...state,
        deleteTransactionSuccess: false
      });
    }

    case actionTypes.DISMISS_DELETE_TRANSACTION_FAILURE_ALERT: {
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
