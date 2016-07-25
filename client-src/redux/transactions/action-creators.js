import _ from 'lodash';
import actionTypes from './action-types';
import mockTransactions from '../mock/transactions';

const transactionsLength = mockTransactions.length;
let lastId = mockTransactions[transactionsLength - 1].id;

export function setTransactionUpdateId(transactionId) {
  return {
    type: actionTypes.SET_TRANSACTION_UPDATE_ID,
    transactionId
  };
}

export function clearTransactionUpdateId() {
  return {
    type: actionTypes.CLEAR_TRANSACTION_UPDATE_ID
  };
}

export function createTransaction(data) {
  return dispatch => {
    dispatch({type: actionTypes.CREATE_TRANSACTION});

    const newId = ++lastId;

    // Simulate fake network latency
    window.setTimeout(() => {
      const newTransaction = {
        ...data,
        id: newId
      };

      dispatch({
        type: actionTypes.CREATE_TRANSACTIONS_SUCCESS,
        transaction: newTransaction
      });
    }, 1000);
  };
}

export function retrieveTransactions({year, month}) {
  return (dispatch, getState) => {
    dispatch({type: actionTypes.RETRIEVE_TRANSACTIONS});

    window.setTimeout(() => {
      // Filter our transactions by the year and month
      const mocks = _.filter(mockTransactions, t => {
        const transactionDate = t.date.split('-');
        return transactionDate[0] === year && transactionDate[1] === month;
      });

      const existingTransactions = getState().transactions.transactions;

      const newMocks = _.reject(mocks, t => {
        return _.find(existingTransactions, e => e.id === t.id);
      });

      // Our new transactions are the ones that already exist, PLUS the ones
      // with IDs that we don't already have in store. We do this to allow
      // folks to edit transactions and not get those edits overridden
      // by the mocks, which never change.
      const transactions = [
        ...existingTransactions,
        ...newMocks
      ];

      dispatch({
        type: actionTypes.RETRIEVE_TRANSACTIONS_SUCCESS,
        transactions
      });
    }, 1200);
  };
}

export function updateTransaction(transaction) {
  return dispatch => {
    dispatch({type: actionTypes.UPDATE_TRANSACTION, transaction});

    window.setTimeout(() => {
      dispatch({
        type: actionTypes.UPDATE_TRANSACTION_SUCCESS,
        transaction
      });
    }, 1000);
  };
}

export function deleteTransaction(transactionId) {
  return dispatch => {
    dispatch({type: actionTypes.DELETE_TRANSACTION});

    window.setTimeout(() => {
      dispatch({
        type: actionTypes.DELETE_TRANSACTION_SUCCESS,
        transactionId
      });
    }, 1000);
  };
}
