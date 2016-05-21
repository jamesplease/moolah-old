import _ from 'lodash';
import actionTypes from './action-types';
import initialState from './initial-state';

export default (state = initialState, action) => {
  switch (action.type) {
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

    case actionTypes.DISMISS_CREATE_CATEGORY_SUCCESS_ALERT: {
      return Object.assign({
        ...state,
        createCategorySuccess: false
      });
    }

    case actionTypes.DISMISS_CREATE_CATEGORY_FAILURE_ALERT: {
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

    case actionTypes.DISMISS_RETRIEVE_CATEGORIES_SUCCESS_ALERT: {
      return Object.assign({
        ...state,
        retrieveCategoriesSuccess: false
      });
    }

    case actionTypes.DISMISS_RETRIEVE_CATEGORIES_FAILURE_ALERT: {
      return Object.assign({
        ...state,
        retrieveCategoriesFailure: false
      });
    }

    // Update category
    case actionTypes.UPDATE_CATEGORY: {
      let currentlyUpdating = [...state.currentlyUpdating];
      currentlyUpdating.push(action.categoryId);
      return Object.assign({
        ...state,
        updatingCategory: true,
        currentlyUpdating
      });
    }

    case actionTypes.UPDATE_CATEGORY_SUCCESS: {
      let current = state.currentlyUpdating;
      let id = action.categoryId;
      let currentlyUpdating = _.without(current, id);

      let categories = ([...state.categories]).map(t => {
        if (t.id !== action.categoryId) {
          return t;
        } else {
          return action.category;
        }
      });

      return Object.assign({
        ...state,
        updatingCategory: false,
        updateCategorySuccess: true,
        currentlyUpdating,
        categories
      });
    }

    case actionTypes.UPDATE_CATEGORY_FAILURE: {
      let current = state.currentlyUpdating;
      let id = action.categoryId;
      let currentlyUpdating = _.without(current, id);
      return Object.assign({
        ...state,
        updatingCategory: false,
        updateCategoryFailure: true,
        currentlyUpdating
      });
    }

    case actionTypes.DISMISS_UPDATE_CATEGORY_SUCCESS_ALERT: {
      return Object.assign({
        ...state,
        updateCategorySuccess: false
      });
    }

    case actionTypes.DISMISS_UPDATE_CATEGORY_FAILURE_ALERT: {
      return Object.assign({
        ...state,
        updateCategoryFailure: false
      });
    }

    // Delete category
    case actionTypes.DELETE_CATEGORY: {
      let currentlyDeleting = [...state.currentlyDeleting];
      currentlyDeleting.push(action.categoryId);
      return Object.assign({
        ...state,
        deletingCategory: true,
        currentlyDeleting
      });
    }

    case actionTypes.DELETE_CATEGORY_SUCCESS: {
      let current = state.currentlyDeleting;
      let id = action.categoryId;
      let currentlyDeleting = _.without(current, id);

      const rejectionFn = val => val.id === action.categoryId;
      let categories = _.reject(state.categories, rejectionFn);
      return Object.assign({
        ...state,
        deletingCategory: false,
        deleteCategorySuccess: true,
        currentlyDeleting,
        categories
      });
    }

    case actionTypes.DELETE_CATEGORY_FAILURE: {
      let current = state.currentlyDeleting;
      let id = action.categoryId;
      let currentlyDeleting = _.without(current, id);
      return Object.assign({
        ...state,
        deletingCategory: false,
        deleteCategoryFailure: true,
        currentlyDeleting
      });
    }

    case actionTypes.DISMISS_DELETE_CATEGORY_SUCCESS_ALERT: {
      return Object.assign({
        ...state,
        deleteCategorySuccess: false
      });
    }

    case actionTypes.DISMISS_DELETE_CATEGORY_FAILURE_ALERT: {
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
