import actionTypes from './action-types';
import initialState from './initial-state';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_MOBILE_MENU: {
      return {
        ...state,
        isMobileMenuVisible: action.isMobileMenuVisible
      };
    }
    default: {
      return state;
    }
  }
};
