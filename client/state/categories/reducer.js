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
      const resourcesMeta = [
        ...state.resourcesMeta,
        {
          id: action.resource.id,
          ...initialResourceMetaState
        }
      ];
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
      const resourcesMeta = action.resources.map(c => {
        return {
          id: c.id,
          ...initialResourceMetaState
        };
      });

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
      const resourcesMeta = state.resourcesMeta.map(c => {
        if (c.id !== action.resource.id) {
          return {...c};
        } else {
          return {
            ...c,
            updatingStatus: 'PENDING'
          };
        }
      });

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

      const resourcesMeta = state.resourcesMeta.map(c => {
        if (c.id !== id) {
          return {...c};
        } else {
          return {
            ...c,
            updatingStatus: 'SUCCESS'
          };
        }
      });

      return {
        ...state,
        resources,
        resourcesMeta
      };
    }

    case actionTypes.UPDATE_CATEGORY_FAILURE: {
      const resourcesMeta = state.resourcesMeta.map(c => {
        if (c.id !== action.resource.id) {
          return {...c};
        } else {
          return {
            ...c,
            updatingStatus: 'FAILURE'
          };
        }
      });

      return {
        ...state,
        resourcesMeta
      };
    }

    case actionTypes.UPDATE_CATEGORY_ABORTED:
    case actionTypes.UPDATE_CATEGORY_RESET_RESOLUTION: {
      const id = action.resource ? action.resource.id : action.resourceId;
      const clonedMeta = _.cloneDeep(state.resourcesMeta);
      const resourcesMeta = clonedMeta.map(c => {
        if (c.id !== id) {
          return {...c};
        } else {
          return {
            ...c,
            updatingStatus: null
          };
        }
      });

      return {
        ...state,
        resourcesMeta
      };
    }

    // Delete category
    case actionTypes.DELETE_CATEGORY: {
      const clonedMeta = _.cloneDeep(state.resourcesMeta);
      const resourcesMeta = clonedMeta.map(c => {
        if (c.id !== action.resource.id) {
          return c;
        } else {
          return {
            ...c,
            isDeleting: c.id === action.resource.id
          };
        }
      });

      return {
        ...state,
        resourcesMeta
      };
    }

    case actionTypes.DELETE_CATEGORY_SUCCESS: {
      const rejectionFn = val => val.id === action.resource.id;
      const clonedResources = _.cloneDeep(state.resources);
      const clonedMeta = _.cloneDeep(state.resourcesMeta);

      let resources = _.reject(clonedResources, rejectionFn);
      let resourcesMeta = _.reject(clonedMeta, rejectionFn);
      return {
        ...state,
        resources,
        resourcesMeta
      };
    }

    case actionTypes.DELETE_CATEGORY_FAILURE:
    case actionTypes.DELETE_CATEGORY_ABORTED: {
      const clonedMeta = _.cloneDeep(state.resourcesMeta);
      const resourcesMeta = clonedMeta.map(c => {
        if (c.id !== action.resource.id) {
          return c;
        } else {
          return {
            ...c,
            isDeleting: false
          };
        }
      });

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
