import actionTypes from './action-types';
import initialState from './initial-state';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN: {
      return {
        ...state,
        user: action.user
      };
    }
    case actionTypes.SIGN_OUT: {
      return {
        ...state,
        user: null
      };
    }
    default: {
      return state;
    }
  }
};
