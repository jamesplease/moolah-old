import log from '../../../../server/logging/log';
import fatalLogs from '../../../../server/logging/fatal-logs';

describe('fatalLogs', function() {
  beforeEach(() => {
    stub(log, 'fatal');
  });

  describe('uncaughtException', () => {
    it('should log the right message', () => {
      const err = {
        message: 'Darn'
      };
      fatalLogs.uncaughtException(err);
      expect(log.fatal).to.have.been.calledOnce;
      expect(log.fatal).to.have.been.calledWithExactly({err}, 'Uncaught exception');
    });
  });
});
