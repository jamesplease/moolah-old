import actionTypes from './action-types';

export function sendMessage() {
  return (dispatch) => {
    dispatch({type: actionTypes.SEND_MESSAGE});

    window.setTimeout(() => {
      dispatch({type: actionTypes.SEND_MESSAGE_SUCCESS});
    }, 1000);
  };
}

export function resetMessageState() {
  // Hello I'm abusing redux-thunk, how are you?
  return (dispatch) => {
    dispatch({type: actionTypes.SEND_MESSAGE_DISMISS_FAILURE_ALERT});
    dispatch({type: actionTypes.SEND_MESSAGE_DISMISS_SUCCESS_ALERT});
  };
}
