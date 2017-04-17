import reducer from '../../../../../client/state/connection/reducer';
import initialState from '../../../../../client/state/connection/initial-state';
import actionTypes from '../../../../../client/state/connection/action-types';

describe('connection/reducers', () => {
  describe('An action with no type', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.deep.equal(initialState);
    });
  });

  describe('USER_ONLINE', () => {
    it('should return true when state is false', () => {
      const result = reducer(false, {type: actionTypes.USER_ONLINE});
      expect(result).to.be.true;
    });

    it('should return true when state is true', () => {
      const result = reducer(true, {type: actionTypes.USER_ONLINE});
      expect(result).to.be.true;
    });
  });

  describe('USER_OFFLINE', () => {
    it('should return false when state is false', () => {
      const result = reducer(false, {type: actionTypes.USER_OFFLINE});
      expect(result).to.be.false;
    });

    it('should return false when state is true', () => {
      const result = reducer(true, {type: actionTypes.USER_OFFLINE});
      expect(result).to.be.false;
    });
  });
});
