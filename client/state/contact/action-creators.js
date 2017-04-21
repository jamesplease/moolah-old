import xhr from 'xhr';
import actionTypes from './action-types';
import authActionTypes from '../auth/action-types';
import defaultXhrHeaders from '../../common/services/default-xhr-headers';

export function sendMessage(data) {
  return (dispatch) => {
    dispatch({type: actionTypes.SEND_MESSAGE});

    const req = xhr.post(
      '/help/messages',
      {
        body: JSON.stringify(data),
        headers: {...defaultXhrHeaders}
      },
      (err, res) => {
        if (req.aborted) {
          dispatch({type: actionTypes.SEND_MESSAGE_ABORTED});
        } else if (res.statusCode === 401) {
          dispatch({type: authActionTypes.UNAUTHORIZED});
        } else if (err || res.statusCode >= 400) {
          dispatch({type: actionTypes.SEND_MESSAGE_FAILURE});
        } else {
          dispatch({
            type: actionTypes.SEND_MESSAGE_SUCCESS
          });
        }
      }
    );

    return req;
  };
}

export function resetSendMessageResolution() {
  return {
    type: actionTypes.SEND_MESSAGE_RESET_RESOLUTION
  };
}
