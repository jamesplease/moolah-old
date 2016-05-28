import actionTypes from './action-types';
import initialState from './initial-state';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_MESSAGE: {
      return Object.assign({
        ...state,
        sendingMessage: true
      });
    }

    case actionTypes.SEND_MESSAGE_SUCCESS: {
      return Object.assign({
        ...state,
        sendingMessage: false,
        sendMessageSuccess: true,
      });
    }

    case actionTypes.SEND_MESSAGE_FAILURE: {
      return Object.assign({
        ...state,
        sendingMessage: false,
        sendMessageFailure: true
      });
    }

    case actionTypes.DISMISS_SEND_MESSAGE_SUCCESS_ALERT: {
      return Object.assign({
        ...state,
        sendMessageSuccess: false
      });
    }

    case actionTypes.DISMISS_SEND_MESSAGE_FAILURE_ALERT: {
      return Object.assign({
        ...state,
        sendMessageFailure: false
      });
    }

    default: {
      return state;
    }
  }
};
