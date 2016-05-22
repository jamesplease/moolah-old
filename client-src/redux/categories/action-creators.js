import actionTypes from './action-types';
import * as alertActionCreators from '../alert/action-creators';
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

      mockCategories.push(newCategory);

      dispatch({
        type: actionTypes.CREATE_CATEGORY_SUCCESS,
        category: newCategory
      });
    }, 1000);
  };
}

export function retrieveCategories() {
  return dispatch => {
    dispatch({type: actionTypes.RETRIEVE_CATEGORIES});

    window.setTimeout(() => {
      dispatch({
        type: actionTypes.RETRIEVE_CATEGORIES_SUCCESS,
        categories: [...mockCategories]
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
      dispatch(alertActionCreators.queueAlert({
        text: 'Category deleted',
        style: 'success',
        isDismissable: true,
        persistent: false,
        undoCallback() {
          console.log('A request has been made to undo a Category delete.');
        }
      }));

      dispatch({
        type: actionTypes.DELETE_CATEGORY_SUCCESS,
        categoryId
      });
    }, 1000);
  };
}
