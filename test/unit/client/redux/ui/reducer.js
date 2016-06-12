import reducer from '../../../../../client-src/redux/ui/reducer';
import initialState from '../../../../../client-src/redux/ui/initial-state';
import actionTypes from '../../../../../client-src/redux/ui/action-types';

describe('ui: reducer', () => {
  describe('when no state and no action matches case', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.equal(initialState);
    });
  });

  describe('when isMobileMenuVisible is true and the action is false', () => {
    let state, action;
    beforeEach(() => {
      state = {isMobileMenuVisible: true};
      action = {
        type: actionTypes.TOGGLE_MOBILE_MENU,
        isMobileMenuVisible: false
      };
    });

    it('should return a new state with isMobileMenuVisible set to false', () => {
      expect(reducer(state, action)).to.deep.equal({isMobileMenuVisible: false});
    });

    it('should not mutate the current state', () => {
      expect(reducer(state, action)).to.not.equal(state);
    });
  });

  describe('when isMobileMenuVisible is false and the action is true', () => {
    let state, action;
    beforeEach(() => {
      state = {isMobileMenuVisible: false};
      action = {
        type: actionTypes.TOGGLE_MOBILE_MENU,
        isMobileMenuVisible: true
      };
    });

    it('should return a new state with isMobileMenuVisible set to true', () => {
      expect(reducer(state, action)).to.deep.equal({isMobileMenuVisible: true});
    });

    it('should not mutate the current state', () => {
      expect(reducer(state, action)).to.not.equal(state);
    });
  });
});
