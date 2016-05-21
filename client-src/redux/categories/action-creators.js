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

export function updateCategory(categoryId, data) {
  return dispatch => {
    dispatch({type: actionTypes.UPDATE_CATEGORY, categoryId});

    fetch(`/api/v1/categories/${categoryId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(resp => {
        dispatch({
          type: actionTypes.UPDATE_CATEGORY_SUCCESS,
          categoryId,
          category: resp.data
        });
      })
      .catch(() => dispatch({
        type: actionTypes.UPDATE_CATEGORY_FAILURE,
        categoryId
      }));
  };
}

export function deleteCategory(categoryId) {
  return dispatch => {
    dispatch({type: actionTypes.DELETE_CATEGORY, categoryId});

    fetch(`/api/v1/categories/${categoryId}`, {method: 'DELETE'})
      .then(() => {
        dispatch({
          type: actionTypes.DELETE_CATEGORY_SUCCESS,
          categoryId
        });
      })
      .catch(() => dispatch({
        type: actionTypes.DELETE_CATEGORY_FAILURE,
        categoryId
      }));
  };
}
