import _ from 'lodash';
import reducer from '../../../../../client-src/redux/alerts/reducer';
import initialState from '../../../../../client-src/redux/alerts/initial-state';
import alertsActionTypes from '../../../../../client-src/redux/alerts/action-types';
import categoryActionTypes from '../../../../../client-src/redux/categories/action-types';

describe('alerts/reducer', function() {
  beforeEach(() => {
    stub(_, 'uniqueId').returns('asdf');
  });

  afterEach(() => {
    _.uniqueId.restore();
  });

  describe('An action with no type', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.deep.equal(initialState);
    });
  });

  describe('PUSH_ALERT', () => {
    it('should push an alert into the queue, accepting only valid attrs', () => {
      const state = {
        alerts: [{id: 1}, {id: 2}, {id: 3}]
      };
      const action = {
        type: alertsActionTypes.PUSH_ALERT,
        newAlert: {
          id: 'food',
          sandwich: false,
          style: 'pasta'
        }
      };
      const newState = {
        alerts: [{id: 1}, {id: 2}, {id: 3}, {
          id: 'food',
          style: 'pasta'
        }]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('DESTROY_FIRST_ALERT', () => {
    it('should remove an alert from the queue', () => {
      const state = {
        alerts: [{id: 1}, {id: 2}, {id: 3}]
      };
      const action = {
        type: alertsActionTypes.DESTROY_FIRST_ALERT
      };
      const newState = {
        alerts: [{id: 2}, {id: 3}]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('UPDATE_CATEGORY_SUCCESS', () => {
    it('should add a new alert to the queue', () => {
      const state = {
        alerts: [{id: 1}, {id: 2}, {id: 3}]
      };
      const action = {
        type: categoryActionTypes.UPDATE_CATEGORY_SUCCESS
      };
      const newState = {
        alerts: [{id: 1}, {id: 2}, {id: 3}, {
          id: 'asdf',
          text: 'Category updated',
          style: 'success',
          isDismissable: true,
          persistent: false
        }]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('UPDATE_CATEGORY_FAILURE', () => {
    it('should add a new alert to the queue', () => {
      const state = {
        alerts: [{id: 1}, {id: 2}, {id: 3}]
      };
      const action = {
        type: categoryActionTypes.UPDATE_CATEGORY_FAILURE
      };
      const newState = {
        alerts: [{id: 1}, {id: 2}, {id: 3}, {
          id: 'asdf',
          style: 'danger',
          text: 'Oops – there was an error. Try that one more time?',
          isDismissable: true,
          persistent: false
        }]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('DELETE_CATEGORY_SUCCESS', () => {
    it('should add a new alert to the queue', () => {
      const state = {
        alerts: [{id: 1}, {id: 2}, {id: 3}]
      };
      const action = {
        type: categoryActionTypes.DELETE_CATEGORY_SUCCESS
      };
      const newState = {
        alerts: [{id: 1}, {id: 2}, {id: 3}, {
          id: 'asdf',
          text: 'Category deleted',
          style: 'success',
          isDismissable: true,
          persistent: false
        }]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('DELETE_CATEGORY_FAILURE', () => {
    it('should add a new alert to the queue', () => {
      const state = {
        alerts: [{id: 1}, {id: 2}, {id: 3}]
      };
      const action = {
        type: categoryActionTypes.DELETE_CATEGORY_FAILURE
      };
      const newState = {
        alerts: [{id: 1}, {id: 2}, {id: 3}, {
          id: 'asdf',
          style: 'danger',
          text: 'Oops – there was an error. Try that one more time?',
          isDismissable: true,
          persistent: false
        }]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });
});
