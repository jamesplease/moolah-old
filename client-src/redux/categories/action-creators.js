import actionTypes from './action-types';

export function createCategory(data) {
  return dispatch => {
    dispatch({type: actionTypes.CREATE_CATEGORY});

    fetch('/api/v1/categories', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(resp => {
        dispatch({
          type: actionTypes.CREATE_CATEGORY_SUCCESS,
          category: resp.data
        });
      })
      .catch(() => dispatch({
        type: actionTypes.CREATE_CATEGORY_FAILURE
      }));
  };
}

export function retrieveCategories() {
  return dispatch => {
    dispatch({type: actionTypes.RETRIEVE_CATEGORIES});

    fetch('/api/v1/categories')
      .then(resp => resp.json())
      .then(resp => {
        dispatch({
          type: actionTypes.RETRIEVE_CATEGORIES_SUCCESS,
          categories: resp.data
        });
      })
      .catch(() => dispatch({
        type: actionTypes.RETRIEVE_CATEGORIES_FAILURE
      }));
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
