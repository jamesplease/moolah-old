import reducer from '../../../../../client/state/contact/reducer';
import initialState from '../../../../../client/state/contact/initial-state';
import actionTypes from '../../../../../client/state/contact/action-types';

describe('connection/reducers', () => {
  describe('An action with no type', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.deep.equal(initialState);
    });
  });

  describe('SEND_MESSAGE', () => {
    it('should set `sendingMessageStatus` to "PENDING"', () => {
      const result = reducer({}, {type: actionTypes.SEND_MESSAGE});
      expect(result).to.deep.equal({
        sendingMessageStatus: 'PENDING'
      });
    });
  });

  describe('SEND_MESSAGE_SUCCESS', () => {
    it('should set `sendingMessageStatus` to "PENDING"', () => {
      const result = reducer({}, {type: actionTypes.SEND_MESSAGE_SUCCESS});
      expect(result).to.deep.equal({
        sendingMessageStatus: 'SUCCESS'
      });
    });
  });

  describe('SEND_MESSAGE_FAILURE', () => {
    it('should set `sendingMessageStatus` to "FAILURE"', () => {
      const result = reducer({}, {type: actionTypes.SEND_MESSAGE_FAILURE});
      expect(result).to.deep.equal({
        sendingMessageStatus: 'FAILURE'
      });
    });
  });

  describe('SEND_MESSAGE_RESET_RESOLUTION', () => {
    it('should set `sendingMessageStatus` to "FAILURE"', () => {
      const state = {
        sendingMessageStatus: 'PENDING'
      };
      const result = reducer(state, {type: actionTypes.SEND_MESSAGE_RESET_RESOLUTION});
      expect(result).to.deep.equal({
        sendingMessageStatus: null
      });
    });
  });
});
