import _ from 'lodash';
import actionTypes from './action-types';

export function setAlertHeight(alertHeight) {
  return {
    type: actionTypes.SET_ALERT_HEIGHT,
    alertHeight
  };
}

export function clearAlertHeight() {
  return {
    type: actionTypes.CLEAR_ALERT_HEIGHT
  };
}
