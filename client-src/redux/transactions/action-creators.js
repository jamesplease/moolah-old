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

export function retrieveTransactions() {
  return (dispatch, getState) => {
    dispatch({type: actionTypes.RETRIEVE_TRANSACTIONS});

    window.setTimeout(() => {
      const existingTransactions = getState().transactions.transactions;
      let transactions;
      if (!existingTransactions.length) {
        transactions = [...mockTransactions];
      } else {
        transactions = existingTransactions;
      }

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
