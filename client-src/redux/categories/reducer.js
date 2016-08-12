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
      let categories = [...state.categories];
      categories.push(action.category);
      const categoriesMeta = [
        ...state.categoriesMeta,
        {
          id: action.category.id,
          ...initialResourceMetaState
        }
      ];
      return {
        ...state,
        creatingCategoryStatus: 'SUCCESS',
        categories,
        categoriesMeta
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
      const categoriesMeta = action.categories.map(c => {
        return {
          id: c.id,
          ...initialResourceMetaState
        };
      });

      return {
        ...state,
        retrievingCategoriesStatus: 'SUCCESS',
        categories: [...action.categories],
        categoriesMeta
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
      const categoriesMeta = state.categoriesMeta.map(c => {
        if (c.id !== action.category.id) {
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
        categoriesMeta
      };
    }

    case actionTypes.UPDATE_CATEGORY_SUCCESS: {
      let id = action.category.id;

      let categories = state.categories.map(c => {
        if (c.id !== id) {
          return {...c};
        } else {
          return {...action.category};
        }
      });

      const categoriesMeta = state.categoriesMeta.map(c => {
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
        categories,
        categoriesMeta
      };
    }

    case actionTypes.UPDATE_CATEGORY_FAILURE: {
      const categoriesMeta = state.categoriesMeta.map(c => {
        if (c.id !== action.category.id) {
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
        categoriesMeta
      };
    }

    case actionTypes.UPDATE_CATEGORY_ABORTED:
    case actionTypes.UPDATE_CATEGORY_RESET_RESOLUTION: {
      const id = action.category ? action.category.id : action.categoryId;
      const clonedMeta = _.cloneDeep(state.categoriesMeta);
      const categoriesMeta = clonedMeta.map(c => {
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
        categoriesMeta
      };
    }

    // Delete category
    case actionTypes.DELETE_CATEGORY: {
      const clonedMeta = _.cloneDeep(state.categoriesMeta);
      const categoriesMeta = clonedMeta.map(c => {
        if (c.id !== action.category.id) {
          return c;
        } else {
          return {
            ...c,
            isDeleting: c.id === action.category.id
          };
        }
      });

      return {
        ...state,
        categoriesMeta
      };
    }

    case actionTypes.DELETE_CATEGORY_SUCCESS: {
      const rejectionFn = val => val.id === action.category.id;
      const clonedCategories = _.cloneDeep(state.categories);
      const clonedMeta = _.cloneDeep(state.categoriesMeta);

      let categories = _.reject(clonedCategories, rejectionFn);
      let categoriesMeta = _.reject(clonedMeta, rejectionFn);
      return {
        ...state,
        categories,
        categoriesMeta
      };
    }

    case actionTypes.DELETE_CATEGORY_FAILURE:
    case actionTypes.DELETE_CATEGORY_ABORTED: {
      const clonedMeta = _.cloneDeep(state.categoriesMeta);
      const categoriesMeta = clonedMeta.map(c => {
        if (c.id !== action.category.id) {
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
        categoriesMeta
      };
    }

    default: {
      return state;
    }
  }
};
