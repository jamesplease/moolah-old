import log from '../../../../server/logging/log';
import warnLogs from '../../../../server/logging/warn-logs';

describe('warnLogs', function() {
  beforeEach(() => {
    stub(log, 'warn');
  });

  describe('unhandledRejection', () => {
    describe('when reason is not an error', () => {
      it('should log the right message', () => {
        const reason = {
          message: 'Darn'
        };
        warnLogs.unhandledRejection(reason);
        expect(log.warn).to.have.been.calledOnce;
        expect(log.warn).to.have.been.calledWithExactly({reason}, 'Unhandled Promise rejection');
      });
    });

    describe('when reason is an error', () => {
      it('should log the right message', () => {
        const err = new Error();
        warnLogs.unhandledRejection(err);
        expect(log.warn).to.have.been.calledOnce;
        expect(log.warn).to.have.been.calledWithExactly({err}, 'Unhandled Promise rejection');
      });
    });
  });
});
