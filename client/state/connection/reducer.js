import actionTypes from './action-types';
import initialState from './initial-state';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_ONLINE: {
      return true;
    }
    case actionTypes.USER_OFFLINE: {
      return false;
    }
    default: {
      return state;
    }
  }
};
