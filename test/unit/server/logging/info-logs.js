import log from '../../../../server/logging/log';
import infoLogs from '../../../../server/logging/info-logs';

describe('infoLogs', function() {
  beforeEach(() => {
    stub(log, 'info');
  });

  describe('serverStart', () => {
    it('should log the right message', () => {
      infoLogs.serverStart(5000);
      expect(log.info).to.have.been.calledOnce;
      expect(log.info).to.have.been.calledWithExactly({
        port: 5000
      }, 'Node app running');
    });
  });
});
