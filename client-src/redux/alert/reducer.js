import _ from 'lodash';
import actionTypes from './action-types';
import initialState from './initial-state';

const validActionProps = [
  'text', 'style', 'onDismissAction',
  'isDismissable', 'persistent',
  'icon', 'alertId'
];

export default (state = initialState, action) => {
  const alertAction = _.pick(action, validActionProps);

  switch (action.type) {
    case actionTypes.QUEUE_ALERT: {
      let queue = [...state.queue];

      // If we already have an alert, then this one
      // isn't ready to be shown. Add it to the back of the
      // alert queue, and that's that.
      if (state.alertIsActive) {
        queue.push(alertAction);
        return {
          ...state,
          queue
        };
      }

      // Otherwise, we can immediately show this alert. No need
      // to queue!
      else {
        return {
          ...state,
          ...alertAction,
          alertIsActive: true
        };
      }
    }

    case actionTypes.DISMISS_ALERT_BY_ID: {
      // If the current alert doesn't match, then we do nothing
      if (state.alertId !== action.alertId) {
        return state;
      }
      // Otherwise, we hide the alert
      else {
        return {
          ...state,
          alertId: null,
          alertIsActive: false
        };
      }
    }

    // All that dismissing the current alert does is make the
    // alert hidden. It keeps the other info so that it animates
    // out properly.
    case actionTypes.DISMISS_CURRENT_ALERT: {
      return {
        ...state,
        alertId: null,
        undoAction: null,
        alertIsActive: false
      };
    }

    case actionTypes.SHOW_NEXT_ALERT: {
      let nextAlert = state.queue[0];
      if (!nextAlert) {
        return state;
      } else {
        return {
          ...state,
          ...nextAlert,
          queue: _.without(state.queue, nextAlert),
          alertIsActive: true
        };
      }
    }

    default: {
      return state;
    }
  }
};
