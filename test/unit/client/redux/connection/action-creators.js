import * as actionCreators from '../../../../../client-src/redux/connection/action-creators';
import actionTypes from '../../../../../client-src/redux/connection/action-types';

describe('connection/action-creators', () => {
  describe('userOnline', () => {
    it('should return the expected action', () => {
      expect(actionCreators.userOnline()).to.deep.equal({
        type: actionTypes.USER_ONLINE
      });
    });
  });

  describe('userOffline', () => {
    it('should return the expected action', () => {
      expect(actionCreators.userOffline()).to.deep.equal({
        type: actionTypes.USER_OFFLINE
      });
    });
  });
});
