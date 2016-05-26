import actionTypes from './action-types';
import mockCategories from '../mock/categories';

let categoriesLength = mockCategories.length;
let lastId = mockCategories[categoriesLength - 1].id;

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

export function updateCategory(categoryId) {
  return dispatch => {
    dispatch({type: actionTypes.UPDATE_CATEGORY, categoryId});

    window.setTimeout(() => {
      // This needs to send the updated category
      dispatch({
        type: actionTypes.UPDATE_CATEGORY_SUCCESS,
        categoryId
      });
    }, 1000);
  };
}

export function deleteCategory(categoryId) {
  return dispatch => {
    dispatch({type: actionTypes.DELETE_CATEGORY, categoryId});

    window.setTimeout(() => {
      dispatch({
        type: actionTypes.DELETE_CATEGORY_SUCCESS,
        categoryId
      });
    }, 1000);
  };
}
