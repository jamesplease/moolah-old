import _ from 'lodash';
import actionTypes from './action-types';
import initialState from './initial-state';

const initialResourceMetaState = {
  isUpdating: false,
  isDeleting: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CATEGORY_UPDATE_ID: {
      return Object.assign({
        ...state,
        categoryIdBeingUpdated: action.categoryId
      });
    }

    case actionTypes.CLEAR_CATEGORY_UPDATE_ID: {
      return Object.assign({
        ...state,
        categoryIdBeingUpdated: null
      });
    }

    // Create category
    case actionTypes.CREATE_CATEGORY: {
      return Object.assign({
        ...state,
        creatingCategory: true
      });
    }

    case actionTypes.CREATE_CATEGORY_SUCCESS: {
      let categories = [...state.categories];
      categories.push(action.category);
      const categoriesMeta = [
        ...state.categoriesMeta,
        {
          ...action.category,
          ...initialResourceMetaState
        }
      ];
      return Object.assign({
        ...state,
        creatingCategory: false,
        createCategorySuccess: true,
        categories,
        categoriesMeta
      });
    }

    case actionTypes.CREATE_CATEGORY_FAILURE: {
      return Object.assign({
        ...state,
        creatingCategory: false,
        createCategoryFailure: true
      });
    }

    case actionTypes.CREATE_CATEGORY_RESET_RESOLUTION: {
      return Object.assign({
        ...state,
        createCategoryFailure: false,
        createCategorySuccess: false
      });
    }

    // Retrieving categories
    case actionTypes.RETRIEVE_CATEGORIES: {
      return Object.assign({
        ...state,
        retrievingCategories: true
      });
    }

    case actionTypes.RETRIEVE_CATEGORIES_SUCCESS: {
      const categoriesMeta = action.categories.map(c => {
        return {
          ...c,
          ...initialResourceMetaState
        };
      });

      return Object.assign({
        ...state,
        retrievingCategories: false,
        retrieveCategoriesSuccess: true,
        categories: [...action.categories],
        categoriesMeta
      });
    }

    case actionTypes.RETRIEVE_CATEGORIES_FAILURE: {
      return Object.assign({
        ...state,
        retrievingCategories: false,
        retrieveCategoriesFailure: true
      });
    }

    case actionTypes.RETRIEVE_CATEGORIES_RESET_RESOLUTION: {
      return Object.assign({
        ...state,
        retrieveCategoriesFailure: false,
        retrieveCategoriesSuccess: false
      });
    }

    // Update category
    case actionTypes.UPDATE_CATEGORY: {
      const categoriesMeta = state.categoriesMeta.map(c => {
        return {
          ...c,
          isUpdating: c.id === action.categoryId
        };
      });

      return Object.assign({
        ...state,
        categoriesMeta,
        updatingCategory: true
      });
    }

    case actionTypes.UPDATE_CATEGORY_SUCCESS: {
      let id = action.category.id;

      let categories = state.categories.map(c => {
        if (c.id !== id) {
          return c;
        } else {
          return action.category;
        }
      });

      const categoriesMeta = state.categoriesMeta.map(c => {
        if (c.id !== action.categoryId) {
          return {...c};
        } else {
          return {
            ...c,
            isUpdating: false
          };
        }
      });

      return Object.assign({
        ...state,
        updatingCategory: false,
        updateCategorySuccess: true,
        categories,
        categoriesMeta
      });
    }

    case actionTypes.UPDATE_CATEGORY_FAILURE: {
      const categoriesMeta = state.categoriesMeta.map(c => {
        if (c.id !== action.categoryId) {
          return {...c};
        } else {
          return {
            ...c,
            isUpdating: false
          };
        }
      });

      return Object.assign({
        ...state,
        categoriesMeta,
        updatingCategory: false,
        updateCategoryFailure: true
      });
    }

    case actionTypes.UPDATE_CATEGORY_RESET_RESOLUTION: {
      return Object.assign({
        ...state,
        updateCategorySuccess: false,
        updateCategoryFailure: false,
      });
    }

    // Delete category
    case actionTypes.DELETE_CATEGORY: {
      const categoriesMeta = state.categoriesMeta.map(c => {
        return {
          ...c,
          isDeleting: c.id === action.categoryId
        };
      });

      return Object.assign({
        ...state,
        categoriesMeta,
        deletingCategory: true,
      });
    }

    case actionTypes.DELETE_CATEGORY_SUCCESS: {
      const rejectionFn = val => val.id === action.categoryId;
      let categories = _.reject(state.categories, rejectionFn);
      let categoriesMeta = _.reject(state.categories, rejectionFn);
      return Object.assign({
        ...state,
        deletingCategory: false,
        deleteCategorySuccess: true,
        categories,
        categoriesMeta
      });
    }

    case actionTypes.DELETE_CATEGORY_FAILURE: {
      const categoriesMeta = state.categoriesMeta.map(c => {
        if (c.id !== action.categoryId) {
          return {...c};
        } else {
          return {
            ...c,
            isDeleting: false
          };
        }
      });

      return Object.assign({
        ...state,
        categoriesMeta,
        deletingCategory: false,
        deleteCategoryFailure: true,
      });
    }

    case actionTypes.DELETE_CATEGORY_RESET_RESOLUTION: {
      return Object.assign({
        ...state,
        deleteCategoryFailure: false,
        deleteCategorySuccess: false
      });
    }

    default: {
      return state;
    }
  }
};
