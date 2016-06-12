import actionTypes from './action-types';
import mockCategories from '../mock/categories';

const categoriesLength = mockCategories.length;
let lastId = mockCategories[categoriesLength - 1].id;

export function setCategoryUpdateId(categoryId) {
  return {
    type: actionTypes.SET_CATEGORY_UPDATE_ID,
    categoryId
  };
}

export function clearCategoryUpdateId() {
  return {
    type: actionTypes.CLEAR_CATEGORY_UPDATE_ID
  };
}

export function dismissCreateCategoryFailureAlert() {
  return {
    type: actionTypes.CREATE_CATEGORY_DISMISS_FAILURE_ALERT
  };
}

export function createCategory(data) {
  return dispatch => {
    dispatch({type: actionTypes.CREATE_CATEGORY});

    const newId = ++lastId;

    // Simulate fake network latency
    window.setTimeout(() => {
      const newCategory = {
        ...data,
        id: newId
      };

      dispatch({
        type: actionTypes.CREATE_CATEGORY_SUCCESS,
        category: newCategory
      });
    }, 1000);
  };
}

export function retrieveCategories() {
  return (dispatch, getState) => {
    dispatch({type: actionTypes.RETRIEVE_CATEGORIES});

    window.setTimeout(() => {
      const existingCategories = getState().categories.categories;
      let categories;
      if (!existingCategories.length) {
        categories = [...mockCategories];
      } else {
        categories = existingCategories;
      }

      dispatch({
        type: actionTypes.RETRIEVE_CATEGORIES_SUCCESS,
        categories
      });
    }, 1200);
  };
}

export function dismissUpdateCategoryFailureAlert() {
  return {
    type: actionTypes.UPDATE_CATEGORY_DISMISS_FAILURE_ALERT
  };
}

export function updateCategory(category) {
  return dispatch => {
    dispatch({type: actionTypes.UPDATE_CATEGORY, category});

    window.setTimeout(() => {
      dispatch({
        type: actionTypes.UPDATE_CATEGORY_SUCCESS,
        category
      });
    }, 1000);
  };
}

export function dismissDeleteCategoryFailureAlert() {
  return {
    type: actionTypes.DELETE_CATEGORY_DISMISS_FAILURE_ALERT
  };
}

export function deleteCategory(categoryId) {
  return dispatch => {
    dispatch({type: actionTypes.DELETE_CATEGORY});

    window.setTimeout(() => {
      dispatch({
        type: actionTypes.DELETE_CATEGORY_SUCCESS,
        categoryId
      });
    }, 1000);
  };
}
