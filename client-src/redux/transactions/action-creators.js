import xhr from 'xhr';
import actionTypes from './action-types';
import authActionTypes from '../auth/action-types';

export function resetCreateTransactionResolution() {
  return {
    type: actionTypes.CREATE_TRANSACTION_RESET_RESOLUTION
  };
}

export function createTransaction(data) {
  return dispatch => {
    dispatch({type: actionTypes.CREATE_TRANSACTION});

    const req = xhr.post(
      '/api/v1/transactions',
      {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/vnd.api+json'
        }
      },
      (err, res, body) => {
        if (req.aborted) {
          dispatch({type: actionTypes.CREATE_TRANSACTION_ABORTED});
        } else if (res.statusCode === 401) {
          dispatch({type: authActionTypes.UNAUTHORIZED});
        } else if (err || res.statusCode >= 400) {
          dispatch({type: actionTypes.CREATE_TRANSACTION_FAILURE});
        } else {
          dispatch({
            type: actionTypes.CREATE_TRANSACTION_SUCCESS,
            transaction: JSON.parse(body).data
          });
        }
      }
    );

    return req;
  };
}

export function resetRetrieveTransactionsResolution() {
  return {
    type: actionTypes.RETRIEVE_TRANSACTIONS_RESET_RESOLUTION
  };
}

export function retrieveTransactions() {
  return (dispatch) => {
    dispatch({type: actionTypes.RETRIEVE_TRANSACTIONS});

    const req = xhr.get(
      '/api/v1/transactions',
      {
        headers: {
          'Content-Type': 'application/vnd.api+json'
        }
      },
      (err, res, body) => {
        if (req.aborted) {
          dispatch({type: actionTypes.RETRIEVE_TRANSACTIONS_ABORTED});
        } else if (res.statusCode === 401) {
          dispatch({type: authActionTypes.UNAUTHORIZED});
        } else if (err || res.statusCode >= 400) {
          dispatch({type: actionTypes.RETRIEVE_TRANSACTIONS_FAILURE});
        } else {
          dispatch({
            type: actionTypes.RETRIEVE_TRANSACTIONS_SUCCESS,
            transactions: JSON.parse(body).data
          });
        }
      }
    );

    return req;
  };
}

export function resetUpdateTransactionResolution(transactionId) {
  return {
    type: actionTypes.UPDATE_TRANSACTION_RESET_RESOLUTION,
    transactionId
  };
}

export function updateTransaction(transaction) {
  return dispatch => {
    dispatch({
      type: actionTypes.UPDATE_TRANSACTION,
      transactionId: transaction.id
    });

    const {id} = transaction;
    const req = xhr.patch(
      `/api/v1/transactions/${id}`,
      {
        body: JSON.stringify(transaction),
        headers: {
          'Content-Type': 'application/vnd.api+json'
        }
      },
      (err, res, body) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.UPDATE_TRANSACTION_ABORTED,
            transactionId: transaction.id
          });
        } else if (res.statusCode === 401) {
          dispatch({type: authActionTypes.UNAUTHORIZED});
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.UPDATE_TRANSACTION_FAILURE,
            transactionId: transaction.id
          });
        } else {
          dispatch({
            type: actionTypes.UPDATE_TRANSACTION_SUCCESS,
            transaction: JSON.parse(body).data
          });
        }
      }
    );

    return req;
  };
}

export function deleteTransaction(transactionId) {
  return dispatch => {
    dispatch({
      type: actionTypes.DELETE_TRANSACTION,
      transactionId
    });

    const req = xhr.del(
      `/api/v1/transactions/${transactionId}`,
      {
        headers: {
          'Content-Type': 'application/vnd.api+json'
        }
      },
      (err, res) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.DELETE_TRANSACTION_ABORTED,
            transactionId
          });
        } else if (res.statusCode === 401) {
          dispatch({type: authActionTypes.UNAUTHORIZED});
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.DELETE_TRANSACTION_FAILURE,
            transactionId
          });
        } else {
          dispatch({
            type: actionTypes.DELETE_TRANSACTION_SUCCESS,
            transactionId
          });
        }
      }
    );

    return req;
  };
}
