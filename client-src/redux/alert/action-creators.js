import _ from 'lodash';
import actionTypes from './action-types';

// Queues an alert to be displayed
export function queueAlert(alertDescription) {
  return dispatch => {
    const alertId = _.uniqueId('alert-');
    dispatch({
      type: actionTypes.QUEUE_ALERT,
      ...alertDescription,
      alertId
    });
  };
}

// Dismisses the current alert
export function dismissCurrentAlert() {
  return {
    type: actionTypes.DISMISS_CURRENT_ALERT
  };
}

// This checks if we have any queued alerts. If we do, it
// shows them.
export function showNextAlert() {
  return {
    type: actionTypes.SHOW_NEXT_ALERT
  };
}
