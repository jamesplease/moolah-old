import actionTypes from './action-types';

export function signIn(user) {
  return {
    type: actionTypes.SIGN_IN,
    user
  };
}

export function signOut(user) {
  return {
    type: actionTypes.SIGN_OUT,
    user
  };
}
