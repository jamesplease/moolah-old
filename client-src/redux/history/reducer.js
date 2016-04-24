import actionTypes from './action-types';
import initialState from './initial-state';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NAVIGATE: {
      return {
        ...state,
        location: action.location
      };
    }
    default: {
      return state;
    }
  }
};
