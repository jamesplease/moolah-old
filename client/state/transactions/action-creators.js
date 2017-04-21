import _ from 'lodash';
import xhr from 'xhr';
import actionTypes from './action-types';
import authActionTypes from '../auth/action-types';
import defaultXhrHeaders from '../../common/services/default-xhr-headers';

export function resetCreateTransactionResolution() {
  return {
    type: actionTypes.CREATE_TRANSACTION_RESET_RESOLUTION
  };
}

export function createTransaction(resource) {
  return (dispatch, getState) => {
    const userId = getState().auth.user.id;
    resource.attributes.user = userId;
    resource.type = 'transactions';

    dispatch({
      type: actionTypes.CREATE_TRANSACTION,
      resource
    });

    const req = xhr.post(
      '/api/transactions',
      {
        body: JSON.stringify({
          data: resource
        }),
        headers: {...defaultXhrHeaders}
      },
      (err, res, body) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.CREATE_TRANSACTION_ABORTED,
            resource
          });
        } else if (res.statusCode === 401) {
          dispatch({type: authActionTypes.UNAUTHORIZED});
        } else if (err || res.statusCode >= 400) {
          dispatch({type: actionTypes.CREATE_TRANSACTION_FAILURE, resource});
        } else {
          dispatch({
            type: actionTypes.CREATE_TRANSACTION_SUCCESS,
            resource: JSON.parse(body).data
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
  return (dispatch, getState) => {
    const {auth} = getState();
    const userId = auth.user.id;
    dispatch({type: actionTypes.RETRIEVE_TRANSACTIONS});

    const req = xhr.get(
      `/api/transactions?filter[user]=${userId}`,
      {
        headers: {...defaultXhrHeaders}
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
            resources: JSON.parse(body).data
          });
        }
      }
    );

    return req;
  };
}

export function resetUpdateTransactionResolution(resourceId) {
  return {
    type: actionTypes.UPDATE_TRANSACTION_RESET_RESOLUTION,
    resourceId
  };
}

export function updateTransaction(resource) {
  resource.type = 'transactions';

  return (dispatch, getState) => {
    const {id} = resource;

    const resourceList = getState().transactions.resources;
    const resourceToUpdate = _.find(resourceList, {id});

    dispatch({
      type: actionTypes.UPDATE_TRANSACTION,
      resource
    });

    const req = xhr.patch(
      `/api/transactions/${id}`,
      {
        body: JSON.stringify({data: resource}),
        headers: {...defaultXhrHeaders}
      },
      (err, res) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.UPDATE_TRANSACTION_ABORTED,
            resource
          });
        } else if (res.statusCode === 401) {
          dispatch({type: authActionTypes.UNAUTHORIZED});
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.UPDATE_TRANSACTION_FAILURE,
            resource
          });
        } else {
          dispatch({
            type: actionTypes.UPDATE_TRANSACTION_SUCCESS,
            resource: {
              ...resourceToUpdate,
              ...resource
            }
          });
        }
      }
    );

    return req;
  };
}

export function deleteTransaction(id) {
  return (dispatch, getState) => {
    const resourceList = getState().transactions.resources;
    const resourceToDelete = _.find(resourceList, {id});

    dispatch({
      type: actionTypes.DELETE_TRANSACTION,
      resource: resourceToDelete
    });

    const req = xhr.del(
      `/api/transactions/${id}`,
      {
        headers: {...defaultXhrHeaders}
      },
      (err, res) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.DELETE_TRANSACTION_ABORTED,
            resource: resourceToDelete
          });
        } else if (res.statusCode === 401) {
          dispatch({type: authActionTypes.UNAUTHORIZED});
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.DELETE_TRANSACTION_FAILURE,
            resource: resourceToDelete
          });
        } else {
          dispatch({
            type: actionTypes.DELETE_TRANSACTION_SUCCESS,
            resource: resourceToDelete
          });
        }
      }
    );

    return req;
  };
}
