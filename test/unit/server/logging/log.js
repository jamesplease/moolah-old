import bunyan from 'bunyan';
import log from '../../../../server/logging/log';

describe('log', () => {
  it('should export an instance of bunyan', () => {
    expect(log).to.be.an.instanceof(bunyan);
  });
});
