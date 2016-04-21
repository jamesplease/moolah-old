import actionTypes from './action-types';

export function userOnline() {
  return { type: actionTypes.USER_ONLINE };
}

export function userOffline() {
  return { type: actionTypes.USER_OFFLINE };
}
