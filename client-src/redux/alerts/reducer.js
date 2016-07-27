import _ from 'lodash';
import alertsActionTypes from './action-types';
import categoriesActionTypes from '../categories/action-types';
import initialState from './initial-state';

const validActionProps = [
  'text', 'style', 'onDismissAction', 'isDismissable', 'persistent',
  'icon', 'id'
];

export default (state = initialState, action) => {
  switch (action.type) {
    case alertsActionTypes.PUSH_ALERT: {
      // Make sure we don't accept just anything!
      const newAlert = _.pick(action.newAlert, validActionProps);
      const clonedAlerts = _.cloneDeep(state.alerts);
      return {
        ...state,
        alerts: [...clonedAlerts, newAlert],
      };
    }

    case alertsActionTypes.DESTROY_FIRST_ALERT: {
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

    case categoriesActionTypes.UPDATE_CATEGORY_FAILURE: {
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
