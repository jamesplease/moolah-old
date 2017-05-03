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
      let resources = [...state.resources];
      resources.push(action.resource);
      const resourcesMeta = {
        ...state.resourcesMeta,
        [action.resource.id]: {
          ...initialResourceMetaState
        }
      };
      return {
        ...state,
        creatingTransactionStatus: 'SUCCESS',
        resources,
        resourcesMeta
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
      const resourcesMeta = action.resources.reduce((memo, c) => {
        memo[c.id] = {...initialResourceMetaState};
        return memo;
      }, {});

      return {
        ...state,
        retrievingTransactionsStatus: 'SUCCESS',
        resources: [...action.resources],
        resourcesMeta
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
      const resourcesMeta = {
        ...state.resourcesMeta,
        [action.resource.id]: {
          ...state.resourcesMeta[action.resource.id],
          updatingStatus: 'PENDING'
        }
      };

      return {
        ...state,
        resourcesMeta
      };
    }

    case actionTypes.UPDATE_TRANSACTION_SUCCESS: {
      let id = action.resource.id;

      let resources = state.resources.map(c => {
        if (c.id !== id) {
          return {...c};
        } else {
          return {...action.resource};
        }
      });

      const resourcesMeta = {
        ...state.resourcesMeta,
        [id]: {
          ...state.resourcesMeta[id],
          updatingStatus: 'SUCCESS'
        }
      };

      return {
        ...state,
        resources,
        resourcesMeta
      };
    }

    case actionTypes.UPDATE_TRANSACTION_FAILURE: {
      const resourcesMeta = {
        ...state.resourcesMeta,
        [action.resource.id]: {
          ...state.resourcesMeta[action.resource.id],
          updatingStatus: 'FAILURE'
        }
      };

      return {
        ...state,
        resourcesMeta
      };
    }

    case actionTypes.UPDATE_TRANSACTION_ABORTED:
    case actionTypes.UPDATE_TRANSACTION_RESET_RESOLUTION: {
      const id = action.resource ? action.resource.id : action.resourceId;
      const resourcesMeta = {
        ...state.resourcesMeta,
        [id]: {
          ...state.resourcesMeta[id],
          updatingStatus: null
        }
      };

      return {
        ...state,
        resourcesMeta
      };
    }

    // Delete transaction
    case actionTypes.DELETE_TRANSACTION: {
      const resourcesMeta = {
        ...state.resourcesMeta,
        [action.resource.id]: {
          ...state.resourcesMeta[action.resource.id],
          isDeleting: true
        }
      };

      return {
        ...state,
        resourcesMeta
      };
    }

    case actionTypes.DELETE_TRANSACTION_SUCCESS: {
      const rejectionFn = val => val.id === action.resource.id;
      const clonedResources = _.cloneDeep(state.resources);

      let resources = _.reject(clonedResources, rejectionFn);
      const resourcesMeta = {
        ...state.resourcesMeta,
        [action.resource.id]: null
      };

      return {
        ...state,
        resources,
        resourcesMeta
      };
    }

    case actionTypes.DELETE_TRANSACTION_FAILURE:
    case actionTypes.DELETE_TRANSACTION_ABORTED: {
      const resourcesMeta = {
        ...state.resourcesMeta,
        [action.resource.id]: {
          ...state.resourcesMeta[action.resource.id],
          isDeleting: false
        }
      };

      return {
        ...state,
        resourcesMeta
      };
    }

    default: {
      return state;
    }
  }
};
