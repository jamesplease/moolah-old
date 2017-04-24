import xhr from 'xhr';
import actionTypes from './action-types';
import defaultXhrHeaders from '../../common/services/default-xhr-headers';

/* eslint import/prefer-default-export:off */

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
