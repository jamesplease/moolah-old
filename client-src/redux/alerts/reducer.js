import _ from 'lodash';
import actionTypes from './action-types';
import initialState from './initial-state';
import categoriesActionTypes from '../categories/action-types';

const validActionProps = [
  'text', 'style', 'onDismissAction',
  'isDismissable', 'persistent',
  'icon', 'id'
];

export default (state = initialState, action) => {
  const alertAction = _.pick(action, validActionProps);

  switch (action.type) {
    case actionTypes.QUEUE_ALERT: {
      const clonedAlerts = _.cloneDeep(state.alerts);
      return {
        ...state,
        alerts: [...clonedAlerts, alertAction],
      };
    }

    case actionTypes.DESTROY_FIRST_ALERT: {
      const clonedAlerts = _.cloneDeep(state.alerts);
      return {
        ...state,
        alerts: clonedAlerts.slice(1)
      };
    }

    case categoriesActionTypes.DELETE_CATEGORY_SUCCESS: {
      const clonedAlerts = _.cloneDeep(state.alerts);
      const id = _.uniqueId('alert-');
      return {
        ...state,
        alerts: [
          ...clonedAlerts,
          {
            id,
            text: 'Category deleted',
            style: 'success',
            isDismissable: true,
            persistent: false
          }
        ]
      };
    }

    case categoriesActionTypes.DELETE_CATEGORY_FAILURE: {
      const clonedAlerts = _.cloneDeep(state.alerts);
      const id = _.uniqueId('alert-');
      return {
        ...state,
        alerts: [
          ...clonedAlerts,
          {
            id,
            style: 'danger',
            text: 'Oops – there was an error. Try that one more time?',
            isDismissable: true,
            persistent: false
          }
        ]
      };
    }

    default: {
      return state;
    }
  }
};
