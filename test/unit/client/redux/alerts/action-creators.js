import _ from 'lodash';
import * as actionCreators from '../../../../../client-src/redux/alerts/action-creators';
import actionTypes from '../../../../../client-src/redux/alerts/action-types';

describe('alerts/action-creators', function() {
  beforeEach(() => {
    stub(_, 'uniqueId').returns('asdf');
  });

  afterEach(() => {
    _.uniqueId.restore();
  });

  describe('pushAlert', () => {
    it('should return the right object', () => {
      const action = actionCreators.pushAlert({hungry: true});
      expect(action).to.deep.equal({
        type: actionTypes.PUSH_ALERT,
        newAlert: {
          id: 'asdf',
          hungry: true
        }
      });
    });
  });

  describe('destroyFirstAlert', () => {
    it('should return the right object', () => {
      const action = actionCreators.destroyFirstAlert();
      expect(action).to.deep.equal({
        type: actionTypes.DESTROY_FIRST_ALERT
      });
    });
  });
});
