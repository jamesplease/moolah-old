import _ from 'lodash';
import actionTypes from './action-types';
import initialState from './initial-state';

const validActionProps = [
  'text', 'style', 'onDismissAction',
  'isDismissable', 'persistent',
  'icon', 'id'
];

export default (state = initialState, action) => {
  const alertAction = _.pick(action, validActionProps);

  switch (action.type) {
    case actionTypes.QUEUE_ALERT: {
      return {
        ...state,
        alerts: [...state.alerts, alertAction],
      };
    }

    case actionTypes.DESTROY_FIRST_ALERT: {
      return {
        ...state,
        animatingOutAlert: false,
        alerts: [...state.alerts.slice(1)]
      };
    }

    default: {
      return state;
    }
  }
};
