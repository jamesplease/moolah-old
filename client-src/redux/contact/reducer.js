import actionTypes from './action-types';
import initialState from './initial-state';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_MESSAGE: {
      return {
        ...state,
        sendingMessageStatus: 'PENDING'
      };
    }

    case actionTypes.SEND_MESSAGE_SUCCESS: {
      return {
        ...state,
        sendingMessageStatus: 'SUCCESS'
      };
    }

    case actionTypes.SEND_MESSAGE_FAILURE: {
      return {
        ...state,
        sendingMessageStatus: 'FAILURE'
      };
    }

    case actionTypes.SEND_MESSAGE_RESET_RESOLUTION: {
      return {
        ...state,
        sendingMessageStatus: null
      };
    }

    default: {
      return state;
    }
  }
};
