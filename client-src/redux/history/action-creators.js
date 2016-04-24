import actionTypes from './action-types';

export function navigate(location) {
  return {
    type: actionTypes.NAVIGATE,
    location
  };
}
