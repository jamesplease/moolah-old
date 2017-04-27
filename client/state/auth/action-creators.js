import xhr from 'xhr';
import actionTypes from './action-types';
import defaultXhrHeaders from '../../common/services/default-xhr-headers';

export function unlinkAccount(serviceName) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UNLINK_ACCOUNT,
      serviceName
    });

    const req = xhr.post(
      `/unlink/${serviceName}`,
      {headers: {...defaultXhrHeaders}},
      (err, res) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.UNLINK_ACCOUNT_ABORT,
            serviceName
          });
        } else if (res.statusCode === 401) {
          dispatch({type: actionTypes.UNAUTHORIZED});
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.UNLINK_ACCOUNT_FAIL,
            serviceName
          });
        } else {
          dispatch({
            type: actionTypes.UNLINK_ACCOUNT_SUCCEED,
            serviceName
          });
        }
      }
    );

    return req;
  };
}

export function updateProfile(resource) {
  const {id} = resource;
  resource.type = 'profiles';

  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PROFILE,
      resource
    });

    const req = xhr.patch(
      `/api/profiles/${id}`,
      {
        headers: {...defaultXhrHeaders},
        body: JSON.stringify({data: resource})
      },
      (err, res) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.UPDATE_PROFILE_ABORT,
            resource
          });
        } else if (res.statusCode === 401) {
          dispatch({type: actionTypes.UNAUTHORIZED});
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.UPDATE_PROFILE_FAIL,
            resource
          });
        } else {
          dispatch({
            type: actionTypes.UPDATE_PROFILE_SUCCEED,
            resource
          });
        }
      }
    );

    return req;
  };
}
