import _ from 'lodash';
import alertsActionTypes from './action-types';
import categoriesActionTypes from '../categories/action-types';
import transactionsActionTypes from '../transactions/action-types';
import initialState from './initial-state';
import {truncateAt} from '../../common/utils/string-util';

const validActionProps = [
  'text', 'style', 'isDismissable', 'persistent',
  'icon', 'id', 'details'
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

    case categoriesActionTypes.CREATE_CATEGORY_SUCCESS: {
      const clonedAlerts = _.cloneDeep(state.alerts);
      const id = _.uniqueId('alert-');
      const categoryLabel = truncateAt(action.resource.attributes.label, 35);
      return {
        ...state,
        alerts: [
          ...clonedAlerts,
          {
            id,
            text: `Created "${categoryLabel}" category`,
            style: 'success',
            isDismissable: true,
            persistent: false
          }
        ]
      };
    }

    case categoriesActionTypes.CREATE_CATEGORY_FAILURE: {
      const clonedAlerts = _.cloneDeep(state.alerts);
      const id = _.uniqueId('alert-');
      const categoryLabel = truncateAt(action.resource.attributes.label, 35);
      return {
        ...state,
        alerts: [
          ...clonedAlerts,
          {
            id,
            style: 'danger',
            text: `There was an error while creating the "${categoryLabel}" category`,
            isDismissable: true,
            persistent: false
          }
        ]
      };
    }

    case categoriesActionTypes.UPDATE_CATEGORY_SUCCESS: {
      const clonedAlerts = _.cloneDeep(state.alerts);
      const id = _.uniqueId('alert-');
      const categoryLabel = truncateAt(action.resource.attributes.label, 35);
      return {
        ...state,
        alerts: [
          ...clonedAlerts,
          {
            id,
            text: `Updated "${categoryLabel}" category`,
            style: 'success',
            isDismissable: true,
            persistent: false
          }
        ]
      };
    }

    case categoriesActionTypes.UPDATE_CATEGORY_FAILURE: {
      const clonedAlerts = _.cloneDeep(state.alerts);
      const id = _.uniqueId('alert-');
      const categoryLabel = truncateAt(action.resource.attributes.label, 35);
      return {
        ...state,
        alerts: [
          ...clonedAlerts,
          {
            id,
            style: 'danger',
            text: `There was an error while updating the "${categoryLabel}" category`,
            isDismissable: true,
            persistent: false
          }
        ]
      };
    }

    case categoriesActionTypes.DELETE_CATEGORY_SUCCESS: {
      const clonedAlerts = _.cloneDeep(state.alerts);
      const id = _.uniqueId('alert-');
      const categoryLabel = truncateAt(action.resource.attributes.label, 35);
      return {
        ...state,
        alerts: [
          ...clonedAlerts,
          {
            id,
            text: `Deleted "${categoryLabel}" category`,
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
      const categoryLabel = truncateAt(action.resource.attributes.label, 35);
      return {
        ...state,
        alerts: [
          ...clonedAlerts,
          {
            id,
            style: 'danger',
            text: `There was an error while deleting the "${categoryLabel}" category`,
            isDismissable: true,
            persistent: false
          }
        ]
      };
    }

    case transactionsActionTypes.CREATE_TRANSACTION_SUCCESS: {
      const clonedAlerts = _.cloneDeep(state.alerts);
      const id = _.uniqueId('alert-');
      const description = truncateAt(action.resource.attributes.description, 35);
      return {
        ...state,
        alerts: [
          ...clonedAlerts,
          {
            id,
            text: `Created "${description}" transaction`,
            style: 'success',
            isDismissable: true,
            persistent: false
          }
        ]
      };
    }

    case transactionsActionTypes.CREATE_TRANSACTION_FAILURE: {
      const clonedAlerts = _.cloneDeep(state.alerts);
      const id = _.uniqueId('alert-');
      const description = truncateAt(action.resource.attributes.description, 35);
      return {
        ...state,
        alerts: [
          ...clonedAlerts,
          {
            id,
            style: 'danger',
            text: `There was an error while creating the "${description}" transaction`,
            isDismissable: true,
            persistent: false
          }
        ]
      };
    }

    case transactionsActionTypes.UPDATE_TRANSACTION_SUCCESS: {
      const clonedAlerts = _.cloneDeep(state.alerts);
      const id = _.uniqueId('alert-');
      const description = truncateAt(action.resource.attributes.description, 35);
      return {
        ...state,
        alerts: [
          ...clonedAlerts,
          {
            id,
            text: `Updated "${description}" transaction`,
            style: 'success',
            isDismissable: true,
            persistent: false
          }
        ]
      };
    }

    case transactionsActionTypes.UPDATE_TRANSACTION_FAILURE: {
      const clonedAlerts = _.cloneDeep(state.alerts);
      const id = _.uniqueId('alert-');
      const description = truncateAt(action.resource.attributes.description, 35);
      return {
        ...state,
        alerts: [
          ...clonedAlerts,
          {
            id,
            style: 'danger',
            text: `There was an error while updating the "${description}" transaction`,
            isDismissable: true,
            persistent: false
          }
        ]
      };
    }

    case transactionsActionTypes.DELETE_TRANSACTION_SUCCESS: {
      const clonedAlerts = _.cloneDeep(state.alerts);
      const id = _.uniqueId('alert-');
      const description = truncateAt(action.resource.attributes.description, 35);
      return {
        ...state,
        alerts: [
          ...clonedAlerts,
          {
            id,
            text: `Deleted "${description}" transaction`,
            style: 'success',
            isDismissable: true,
            persistent: false
          }
        ]
      };
    }

    case transactionsActionTypes.DELETE_TRANSACTION_FAILURE: {
      const clonedAlerts = _.cloneDeep(state.alerts);
      const id = _.uniqueId('alert-');
      const description = truncateAt(action.resource.attributes.description, 35);
      return {
        ...state,
        alerts: [
          ...clonedAlerts,
          {
            id,
            style: 'danger',
            text: `There was an error while deleting the "${description}" transaction`,
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
