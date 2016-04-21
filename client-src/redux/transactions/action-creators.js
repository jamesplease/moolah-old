import actionTypes from './action-types';

export function createTransaction(data) {
  return dispatch => {
    dispatch({type: actionTypes.CREATE_TRANSACTION});

    fetch('/api/v1/transactions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(resp => {
        dispatch({
          type: actionTypes.CREATE_TRANSACTION_SUCCESS,
          transaction: resp.data
        });
      })
      .catch(() => dispatch({
        type: actionTypes.CREATE_TRANSACTION_FAILURE
      }));
  };
}

export function retrieveTransactions() {
  return dispatch => {
    dispatch({type: actionTypes.RETRIEVE_TRANSACTIONS});

    fetch('/api/v1/transactions')
      .then(resp => resp.json())
      .then(resp => {
        dispatch({
          type: actionTypes.RETRIEVE_TRANSACTIONS_SUCCESS,
          transactions: resp.data
        });
      })
      .catch(() => dispatch({
        type: actionTypes.RETRIEVE_TRANSACTIONS_FAILURE
      }));
  };
}

export function updateTransaction(transactionId, data) {
  return dispatch => {
    dispatch({type: actionTypes.UPDATE_TRANSACTION, transactionId});

    fetch(`/api/v1/transactions/${transactionId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(resp => {
        dispatch({
          type: actionTypes.UPDATE_TRANSACTION_SUCCESS,
          transactionId,
          transaction: resp.data
        });
      })
      .catch(() => dispatch({
        type: actionTypes.UPDATE_TRANSACTION_FAILURE,
        transactionId
      }));
  };
}

export function deleteTransaction(transactionId) {
  return dispatch => {
    dispatch({type: actionTypes.DELETE_TRANSACTION, transactionId});

    fetch(`/api/v1/transactions/${transactionId}`, {method: 'DELETE'})
      .then(() => {
        dispatch({
          type: actionTypes.DELETE_TRANSACTION_SUCCESS,
          transactionId
        });
      })
      .catch(() => dispatch({
        type: actionTypes.DELETE_TRANSACTION_FAILURE,
        transactionId
      }));
  };
}
