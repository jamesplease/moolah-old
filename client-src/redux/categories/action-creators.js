import _ from 'lodash';
import xhr from 'xhr';
import actionTypes from './action-types';
import authActionTypes from '../auth/action-types';

export function resetCreateCategoryResolution() {
  return {
    type: actionTypes.CREATE_CATEGORY_RESET_RESOLUTION
  };
}

export function createCategory(attributes) {
  const categoryResource = {
    type: 'categories',
    attributes
  };

  return dispatch => {
    dispatch({
      type: actionTypes.CREATE_CATEGORY,
      resource: categoryResource
    });

    const req = xhr.post(
      '/api/categories',
      {
        body: JSON.stringify({
          data: categoryResource
        }),
        headers: {
          'Content-Type': 'application/vnd.api+json'
        }
      },
      (err, res, body) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.CREATE_CATEGORY_ABORTED,
            resource: categoryResource
          });
        } else if (res.statusCode === 401) {
          dispatch({type: authActionTypes.UNAUTHORIZED});
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.CREATE_CATEGORY_FAILURE,
            resource: categoryResource
          });
        } else {
          dispatch({
            type: actionTypes.CREATE_CATEGORY_SUCCESS,
            resource: JSON.parse(body).data
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
      '/api/categories',
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
            resources: JSON.parse(body).data
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

export function updateCategory(categoryResource) {
  categoryResource.type = 'categories';

  return (dispatch, getState) => {
    const {id} = categoryResource;

    const categoryList = getState().categories.categories;
    const categoryToUpdate = _.find(categoryList, {id});

    dispatch({
      type: actionTypes.UPDATE_CATEGORY,
      resource: categoryResource
    });

    const req = xhr.patch(
      `/api/categories/${id}`,
      {
        body: JSON.stringify({data: categoryResource}),
        headers: {
          'Content-Type': 'application/vnd.api+json'
        }
      },
      (err, res) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.UPDATE_CATEGORY_ABORTED,
            resource: categoryResource
          });
        } else if (res.statusCode === 401) {
          dispatch({type: authActionTypes.UNAUTHORIZED});
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.UPDATE_CATEGORY_FAILURE,
            resource: categoryResource
          });
        } else {
          dispatch({
            type: actionTypes.UPDATE_CATEGORY_SUCCESS,
            resource: {
              // Fortune's JSON API implementation returns a 204, so we must
              // merge the existing resource with the one that we sent over
              ...categoryToUpdate,
              ...categoryResource
            }
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
      resource: categoryToDelete
    });

    const req = xhr.del(
      `/api/categories/${categoryId}`,
      {
        headers: {
          'Content-Type': 'application/vnd.api+json'
        }
      },
      (err, res) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.DELETE_CATEGORY_ABORTED,
            resource: categoryToDelete
          });
        } else if (res.statusCode === 401) {
          dispatch({type: authActionTypes.UNAUTHORIZED});
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.DELETE_CATEGORY_FAILURE,
            resource: categoryToDelete
          });
        } else {
          dispatch({
            type: actionTypes.DELETE_CATEGORY_SUCCESS,
            resource: categoryToDelete
          });
        }
      }
    );

    return req;
  };
}
