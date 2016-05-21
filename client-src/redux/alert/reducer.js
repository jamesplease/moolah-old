import _ from 'lodash';
import actionTypes from './action-types';
import initialState from './initial-state';

const validActionProps = [
  'text', 'style', 'isDismissable',
  'icon', 'alertId'
];

export default (state = initialState, action) => {
  const strippedAction = _.pick(action, validActionProps);
  switch (action.type) {
    case actionTypes.QUEUE_ALERT: {
      return {
        ...state,
        ...strippedAction,
        visible: true
      };
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
          isDismissable: null,
          alertId: null,
          visible: false
        };
      }
    }

    // All that dismissing the current alert does is make the
    // alert hidden. It keeps the other info so that it animates
    // out properly.
    case actionTypes.DISMISS_CURRENT_ALERT: {
      return {
        ...state,
        isDismissable: null,
        alertId: null,
        visible: false
      };
    }
    default: {
      return state;
    }
  }
};
