import reducer from '../../../../../client-src/state/auth/reducer';
import initialState from '../../../../../client-src/state/auth/initial-state';

describe('auth/reducers', () => {
  describe('An action with no type', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.deep.equal(initialState);
    });
  });
});
