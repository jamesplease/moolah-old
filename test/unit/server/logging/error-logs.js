import bunyan from 'bunyan';
import log from '../../../../server/logging/log';
import errorLogs from '../../../../server/logging/error-logs';

describe('errorLogs', function() {
  beforeEach(() => {
    this.req = {
      id: 2
    };
    this.res = {
      url: 'hello'
    };
    this.err = {
      message: 'oink'
    };

    stub(log, 'error');
  });

  describe('logoutError', () => {
    it('should log the right message', () => {
      errorLogs.logoutError(this.req, this.res, this.err);
      expect(log.error).to.have.been.calledOnce;
      expect(log.error).to.have.been.calledWithExactly({
        req: this.req,
        res: this.res,
        err: this.err,
        reqId: 2
      }, 'Logout error: session save failed');
    });
  });

  describe('loginError', () => {
    it('should log the right message', () => {
      errorLogs.loginError(this.req, this.res, this.err);
      expect(log.error).to.have.been.calledOnce;
      expect(log.error).to.have.been.calledWithExactly({
        req: this.req,
        res: this.res,
        err: this.err,
        reqId: 2
      }, 'Login error: session save failed');
    });
  });
});
