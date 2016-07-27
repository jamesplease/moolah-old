import actionTypes from './action-types';
import initialState from './initial-state';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_MESSAGE: {
      return {
        ...state,
        sendingMessage: true
      };
    }

    case actionTypes.SEND_MESSAGE_SUCCESS: {
      return {
        ...state,
        sendingMessage: false,
        sendMessageSuccess: true,
      };
    }

    case actionTypes.SEND_MESSAGE_FAILURE: {
      return {
        ...state,
        sendingMessage: false,
        sendMessageFailure: true
      };
    }

    case actionTypes.SEND_MESSAGE_RESET_RESOLUTION: {
      return {
        ...state,
        sendMessageFailure: false,
        sendMessageSuccess: false
      };
    }

    default: {
      return state;
    }
  }
};
