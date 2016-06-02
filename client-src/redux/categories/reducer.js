import _ from 'lodash';
import actionTypes from './action-types';
import initialState from './initial-state';

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
      return Object.assign({
        ...state,
        creatingCategory: false,
        createCategorySuccess: true,
        categories
      });
    }

    case actionTypes.CREATE_CATEGORY_FAILURE: {
      return Object.assign({
        ...state,
        creatingCategory: false,
        createCategoryFailure: true
      });
    }

    case actionTypes.CREATE_CATEGORY_DISMISS_SUCCESS_ALERT: {
      return Object.assign({
        ...state,
        createCategorySuccess: false
      });
    }

    case actionTypes.CREATE_CATEGORY_DISMISS_FAILURE_ALERT: {
      return Object.assign({
        ...state,
        createCategoryFailure: false
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
      return Object.assign({
        ...state,
        retrievingCategories: false,
        retrieveCategoriesSuccess: true,
        categories: action.categories
      });
    }

    case actionTypes.RETRIEVE_CATEGORIES_FAILURE: {
      return Object.assign({
        ...state,
        retrievingCategories: false,
        retrieveCategoriesFailure: true
      });
    }

    case actionTypes.RETRIEVE_CATEGORIES_DISMISS_SUCCESS_ALERT: {
      return Object.assign({
        ...state,
        retrieveCategoriesSuccess: false
      });
    }

    case actionTypes.RETRIEVE_CATEGORIES_DISMISS_FAILURE_ALERT: {
      return Object.assign({
        ...state,
        retrieveCategoriesFailure: false
      });
    }

    // Update category
    case actionTypes.UPDATE_CATEGORY: {
      return Object.assign({
        ...state,
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

      return Object.assign({
        ...state,
        updatingCategory: false,
        updateCategorySuccess: true,
        categories
      });
    }

    case actionTypes.UPDATE_CATEGORY_FAILURE: {
      return Object.assign({
        ...state,
        updatingCategory: false,
        updateCategoryFailure: true
      });
    }

    case actionTypes.UPDATE_CATEGORY_DISMISS_SUCCESS_ALERT: {
      return Object.assign({
        ...state,
        updateCategorySuccess: false
      });
    }

    case actionTypes.UPDATE_CATEGORY_DISMISS_FAILURE_ALERT: {
      return Object.assign({
        ...state,
        updateCategoryFailure: false
      });
    }

    // Delete category
    case actionTypes.DELETE_CATEGORY: {
      return Object.assign({
        ...state,
        deletingCategory: true,
      });
    }

    case actionTypes.DELETE_CATEGORY_SUCCESS: {
      const rejectionFn = val => val.id === action.categoryId;
      let categories = _.reject(state.categories, rejectionFn);
      return Object.assign({
        ...state,
        deletingCategory: false,
        deleteCategorySuccess: true,
        categories
      });
    }

    case actionTypes.DELETE_CATEGORY_FAILURE: {
      return Object.assign({
        ...state,
        deletingCategory: false,
        deleteCategoryFailure: true,
      });
    }

    case actionTypes.DELETE_CATEGORY_DISMISS_SUCCESS_ALERT: {
      return Object.assign({
        ...state,
        deleteCategorySuccess: false
      });
    }

    case actionTypes.DELETE_CATEGORY_DISMISS_FAILURE_ALERT: {
      return Object.assign({
        ...state,
        deleteCategoryFailure: false
      });
    }

    default: {
      return state;
    }
  }
};
