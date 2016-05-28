import actionTypes from './action-types';

export function sendMessage() {
  return (dispatch) => {
    dispatch({type: actionTypes.SEND_MESSAGE});

    window.setTimeout(() => {
      dispatch({type: actionTypes.SEND_MESSAGE_SUCCESS});
    }, 1000);
  };
}
