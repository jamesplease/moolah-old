import xhr from 'xhr';
import actionTypes from './action-types';

export function sendMessage(data) {
  return (dispatch) => {
    dispatch({type: actionTypes.SEND_MESSAGE});

    const req = xhr.post(
      '/help/messages',
      {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/vnd.api+json'
        }
      },
      (err, res) => {
        if (req.aborted) {
          dispatch({type: actionTypes.SEND_MESSAGE_ABORTED});
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
