import xhr from 'xhr';
import actionTypes from './action-types';

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
      {json: data},
      (err, res, body) => {
        if (req.aborted) {
          dispatch({type: actionTypes.CREATE_TRANSACTION_ABORTED});
        } else if (err || res.statusCode >= 400) {
          dispatch({type: actionTypes.CREATE_TRANSACTION_FAILURE});
        } else {
          dispatch({
            type: actionTypes.CREATE_TRANSACTION_SUCCESS,
            transaction: body
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
      {json: true},
      (err, res, body) => {
        if (req.aborted) {
          dispatch({type: actionTypes.RETRIEVE_TRANSACTIONS_ABORTED});
        } else if (err || res.statusCode >= 400) {
          dispatch({type: actionTypes.RETRIEVE_TRANSACTIONS_FAILURE});
        } else {
          dispatch({
            type: actionTypes.RETRIEVE_TRANSACTIONS_SUCCESS,
            transactions: body
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
      {json: transaction},
      (err, res, body) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.UPDATE_TRANSACTION_ABORTED,
            transactionId: transaction.id
          });
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.UPDATE_TRANSACTION_FAILURE,
            transactionId: transaction.id
          });
        } else {
          dispatch({
            type: actionTypes.UPDATE_TRANSACTION_SUCCESS,
            transaction: body
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
      {json: true},
      (err, res) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.DELETE_TRANSACTION_ABORTED,
            transactionId
          });
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
