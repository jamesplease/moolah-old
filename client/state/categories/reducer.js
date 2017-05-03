import _ from 'lodash';
import actionTypes from './action-types';
import initialState from './initial-state';

const initialResourceMetaState = {
  updatingStatus: null,
  isDeleting: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Create category
    case actionTypes.CREATE_CATEGORY: {
      return {
        ...state,
        creatingCategoryStatus: 'PENDING'
      };
    }

    case actionTypes.CREATE_CATEGORY_SUCCESS: {
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
        creatingCategoryStatus: 'SUCCESS',
        resources,
        resourcesMeta
      };
    }

    case actionTypes.CREATE_CATEGORY_FAILURE: {
      return {
        ...state,
        creatingCategoryStatus: 'FAILURE'
      };
    }

    case actionTypes.CREATE_CATEGORY_ABORTED:
    case actionTypes.CREATE_CATEGORY_RESET_RESOLUTION: {
      return {
        ...state,
        creatingCategoryStatus: null
      };
    }

    // Retrieving categories
    case actionTypes.RETRIEVE_CATEGORIES: {
      return {
        ...state,
        retrievingCategoriesStatus: 'PENDING'
      };
    }

    case actionTypes.RETRIEVE_CATEGORIES_SUCCESS: {
      const resourcesMeta = action.resources.reduce((result, c) => {
        result[c.id] = {...initialResourceMetaState};
        return result;
      }, {});

      return {
        ...state,
        retrievingCategoriesStatus: 'SUCCESS',
        resources: [...action.resources],
        resourcesMeta
      };
    }

    case actionTypes.RETRIEVE_CATEGORIES_FAILURE: {
      return {
        ...state,
        retrievingCategoriesStatus: 'FAILURE'
      };
    }

    case actionTypes.RETRIEVE_CATEGORIES_ABORTED:
    case actionTypes.RETRIEVE_CATEGORIES_RESET_RESOLUTION: {
      return {
        ...state,
        retrievingCategoriesStatus: null
      };
    }

    // Update category
    case actionTypes.UPDATE_CATEGORY: {
      const {id} = action.resource;

      const resourcesMeta = {
        ...state.resourcesMeta,
        [id]: {
          ...state.resourcesMeta[id],
          updatingStatus: 'PENDING'
        }
      };

      return {
        ...state,
        resourcesMeta
      };
    }

    case actionTypes.UPDATE_CATEGORY_SUCCESS: {
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

    case actionTypes.UPDATE_CATEGORY_FAILURE: {
      let id = action.resource.id;

      const resourcesMeta = {
        ...state.resourcesMeta,
        [id]: {
          ...state.resourcesMeta[id],
          updatingStatus: 'FAILURE'
        }
      };

      return {
        ...state,
        resourcesMeta
      };
    }

    case actionTypes.UPDATE_CATEGORY_ABORTED:
    case actionTypes.UPDATE_CATEGORY_RESET_RESOLUTION: {
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

    // Delete category
    case actionTypes.DELETE_CATEGORY: {
      let id = action.resource.id;
      const resourcesMeta = {
        ...state.resourcesMeta,
        [id]: {
          ...state.resourcesMeta[id],
          isDeleting: true
        }
      };

      return {
        ...state,
        resourcesMeta
      };
    }

    case actionTypes.DELETE_CATEGORY_SUCCESS: {
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

    case actionTypes.DELETE_CATEGORY_FAILURE:
    case actionTypes.DELETE_CATEGORY_ABORTED: {
      let id = action.resource.id;
      const resourcesMeta = {
        ...state.resourcesMeta,
        [id]: {
          ...state.resourcesMeta[id],
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
