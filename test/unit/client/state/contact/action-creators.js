import xhr from 'xhr';
import sinon from 'sinon';
import * as actionCreators from '../../../../../client/state/contact/action-creators';
import actionTypes from '../../../../../client/state/contact/action-types';

describe('contact/actionCreators', function() {
  beforeEach(() => {
    useFakeXMLHttpRequest();
    xhr.XMLHttpRequest = sinon.FakeXMLHttpRequest;
    this.FakeXMLHttpRequest = sinon.FakeXMLHttpRequest;
    this.dispatch = stub();
    spy(xhr);
  });

  describe('sendMessage', () => {
    it('should dispatch a begin action before making the request', () => {
      const thunk = actionCreators.sendMessage({label: 'pizza'});
      thunk(this.dispatch);
      expect(this.dispatch).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledWithExactly({
        type: actionTypes.SEND_MESSAGE
      });
      expect(this.dispatch).to.have.been.calledBefore(xhr.post);
    });

    it('should generate the expected request', () => {
      const thunk = actionCreators.sendMessage({label: 'pizza'});
      const req = thunk(this.dispatch);
      expect(req).to.be.instanceof(this.FakeXMLHttpRequest);
      expect(req.url).to.equal('/help/messages');
      expect(req.method).to.equal('POST');
      const expectedBody = JSON.stringify({label: 'pizza'});
      expect(req.requestBody).to.deep.equal(expectedBody);
    });

    it('should respond appropriately when there are no errors', () => {
      const thunk = actionCreators.sendMessage({label: 'pizza'});
      const req = thunk(this.dispatch);
      req.respond(202);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.SEND_MESSAGE_SUCCESS
      });
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.SEND_MESSAGE_FAILURE
      });
    });

    it('should respond appropriately when aborted', () => {
      const thunk = actionCreators.sendMessage({label: 'pizza'});
      const req = thunk(this.dispatch);
      req.abort();
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.SEND_MESSAGE
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.SEND_MESSAGE_ABORTED
      });
    });

    it('should respond appropriately when a error status code is returned', () => {
      const thunk = actionCreators.sendMessage({label: 'pizza'});
      const req = thunk(this.dispatch);
      req.respond(500);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.SEND_MESSAGE_SUCCESS
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.SEND_MESSAGE_FAILURE
      });
    });
  });

  describe('resetSendMessageResolution', () => {
    it('should return the right action', () => {
      const result = actionCreators.resetSendMessageResolution();
      expect(result).to.deep.equal({
        type: actionTypes.SEND_MESSAGE_RESET_RESOLUTION
      });
    });
  });
});
