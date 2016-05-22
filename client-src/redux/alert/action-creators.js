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

    // Alerts display for 2 seconds unless `persistent` is passed.
    if (!alertDescription.persistent) {
      window.setTimeout(() => dispatch({
        type: actionTypes.DISMISS_ALERT_BY_ID,
        alertId
      }), 2000);
    }
  };
}

// Dismisses the current alert, showing the queued one, if it exists
export function dismissCurrentAlert() {
  return {
    type: actionTypes.DISMISS_CURRENT_ALERT
  };
}
