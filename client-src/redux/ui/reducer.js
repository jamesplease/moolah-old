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
    case actionTypes.SET_ALERT_HEIGHT: {
      return {
        ...state,
        alertHeight: action.alertHeight
      };
    }

    case actionTypes.CLEAR_ALERT_HEIGHT: {
      return {
        ...state,
        alertHeight: null
      };
    }

    default: {
      return state;
    }
  }
};
