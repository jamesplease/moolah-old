import _ from 'lodash';
import xhr from 'xhr';
import actionTypes from './action-types';
import authActionTypes from '../auth/action-types';

export function resetCreateCategoryResolution() {
  return {
    type: actionTypes.CREATE_CATEGORY_RESET_RESOLUTION
  };
}

export function createCategory(data) {
  return dispatch => {
    dispatch({
      type: actionTypes.CREATE_CATEGORY,
      category: data
    });

    const req = xhr.post(
      '/api/v1/categories',
      {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/vnd.api+json'
        }
      },
      (err, res, body) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.CREATE_CATEGORY_ABORTED,
            category: data
          });
        } else if (res.statusCode === 401) {
          dispatch({type: authActionTypes.UNAUTHORIZED});
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.CREATE_CATEGORY_FAILURE,
            category: data
          });
        } else {
          dispatch({
            type: actionTypes.CREATE_CATEGORY_SUCCESS,
            category: JSON.parse(body).data
          });
        }
      }
    );

    return req;
  };
}

export function resetRetrieveCategoriesResolution() {
  return {
    type: actionTypes.RETRIEVE_CATEGORIES_RESET_RESOLUTION
  };
}

export function retrieveCategories() {
  return (dispatch) => {
    dispatch({type: actionTypes.RETRIEVE_CATEGORIES});

    const req = xhr.get(
      '/api/v1/categories',
      {
        headers: {
          'Content-Type': 'application/vnd.api+json'
        }
      },
      (err, res, body) => {
        if (req.aborted) {
          dispatch({type: actionTypes.RETRIEVE_CATEGORIES_ABORTED});
        } else if (res.statusCode === 401) {
          dispatch({type: authActionTypes.UNAUTHORIZED});
        } else if (err || res.statusCode >= 400) {
          dispatch({type: actionTypes.RETRIEVE_CATEGORIES_FAILURE});
        } else {
          dispatch({
            type: actionTypes.RETRIEVE_CATEGORIES_SUCCESS,
            categories: JSON.parse(body).data
          });
        }
      }
    );

    return req;
  };
}

export function resetUpdateCategoryResolution(categoryId) {
  return {
    type: actionTypes.UPDATE_CATEGORY_RESET_RESOLUTION,
    categoryId
  };
}

export function updateCategory(category) {
  return dispatch => {
    dispatch({
      type: actionTypes.UPDATE_CATEGORY,
      category
    });

    const {id} = category;
    const req = xhr.patch(
      `/api/v1/categories/${id}`,
      {
        body: JSON.stringify(category),
        headers: {
          'Content-Type': 'application/vnd.api+json'
        }
      },
      (err, res, body) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.UPDATE_CATEGORY_ABORTED,
            category
          });
        } else if (res.statusCode === 401) {
          dispatch({type: authActionTypes.UNAUTHORIZED});
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.UPDATE_CATEGORY_FAILURE,
            category
          });
        } else {
          dispatch({
            type: actionTypes.UPDATE_CATEGORY_SUCCESS,
            category: JSON.parse(body).data
          });
        }
      }
    );

    return req;
  };
}

export function deleteCategory(categoryId) {
  return (dispatch, getState) => {
    const categoryList = getState().categories.categories;
    const categoryToDelete = _.find(categoryList, {id: categoryId});

    dispatch({
      type: actionTypes.DELETE_CATEGORY,
      category: categoryToDelete
    });

    const req = xhr.del(
      `/api/v1/categories/${categoryId}`,
      {
        headers: {
          'Content-Type': 'application/vnd.api+json'
        }
      },
      (err, res) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.DELETE_CATEGORY_ABORTED,
            category: categoryToDelete
          });
        } else if (res.statusCode === 401) {
          dispatch({type: authActionTypes.UNAUTHORIZED});
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.DELETE_CATEGORY_FAILURE,
            category: categoryToDelete
          });
        } else {
          dispatch({
            type: actionTypes.DELETE_CATEGORY_SUCCESS,
            category: categoryToDelete
          });
        }
      }
    );

    return req;
  };
}
