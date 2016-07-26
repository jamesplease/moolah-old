import xhr from 'xhr';
import actionTypes from './action-types';

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

export function resetCreateCategoryResolution() {
  return {
    type: actionTypes.CREATE_CATEGORY_RESET_RESOLUTION
  };
}

export function createCategory(data) {
  return dispatch => {
    dispatch({type: actionTypes.CREATE_CATEGORY});

    const req = xhr.post(
      '/api/v1/categories',
      {json: data},
      (err, res, body) => {
        if (req.aborted) {
          return;
        }
        if (err) {
          dispatch({type: actionTypes.CREATE_CATEGORY_FAILURE});
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

export function retrieveCategories() {
  return (dispatch) => {
    dispatch({type: actionTypes.RETRIEVE_CATEGORIES});

    const req = xhr.get(
      '/api/v1/categories',
      {json: true},
      (err, res, body) => {
        if (req.aborted) {
          return;
        }
        if (err) {
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

export function resetUpdateCategoryResolution() {
  return {
    type: actionTypes.UPDATE_CATEGORY_RESET_RESOLUTION
  };
}

export function updateCategory(category) {
  return dispatch => {
    dispatch({type: actionTypes.UPDATE_CATEGORY, category});

    const {id} = category;
    const req = xhr.patch(
      `/api/v1/categories/${id}`,
      {json: category},
      (err, res, body) => {
        if (req.aborted) {
          return;
        }
        if (err) {
          dispatch({type: actionTypes.UPDATE_CATEGORY_FAILURE});
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
  return dispatch => {
    dispatch({
      type: actionTypes.DELETE_CATEGORY,
      categoryId
    });

    const req = xhr.del(
      `/api/v1/categories/${categoryId}`,
      {json: true},
      (err, res) => {
        if (req.aborted) {
          return;
        }
        if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.DELETE_CATEGORY_FAILURE,
            categoryId
          });
        } else {
          dispatch({
            type: actionTypes.DELETE_CATEGORY_SUCCESS,
            categoryId
          });
        }
      }
    );

    return req;
  };
}
