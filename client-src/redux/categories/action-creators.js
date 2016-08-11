import _ from 'lodash';
import xhr from 'xhr';
import actionTypes from './action-types';

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
      {json: data},
      (err, res, body) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.CREATE_CATEGORY_ABORTED,
            category: data
          });
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.CREATE_CATEGORY_FAILURE,
            category: data
          });
        } else {
          dispatch({
            type: actionTypes.CREATE_CATEGORY_SUCCESS,
            category: body
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
      {json: true},
      (err, res, body) => {
        if (req.aborted) {
          dispatch({type: actionTypes.RETRIEVE_CATEGORIES_ABORTED});
        } else if (err || res.statusCode >= 400) {
          dispatch({type: actionTypes.RETRIEVE_CATEGORIES_FAILURE});
        } else {
          dispatch({
            type: actionTypes.RETRIEVE_CATEGORIES_SUCCESS,
            categories: body
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
      {json: category},
      (err, res, body) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.UPDATE_CATEGORY_ABORTED,
            category
          });
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.UPDATE_CATEGORY_FAILURE,
            category
          });
        } else {
          dispatch({
            type: actionTypes.UPDATE_CATEGORY_SUCCESS,
            category: body
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
      {json: true},
      (err, res) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.DELETE_CATEGORY_ABORTED,
            category: categoryToDelete
          });
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
