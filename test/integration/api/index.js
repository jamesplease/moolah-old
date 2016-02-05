import loadMocks from './load-mocks';

beforeEach(function() {
  loadMocks();
  // Give time for the mocks to process
  this.timeout(500);
});
