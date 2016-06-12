import createAsyncConstants from '../../../../../client-src/redux/util/create-async-constants';

describe('createAsyncConstants', () => {
  it('should be a function', () => {
    expect(createAsyncConstants).to.be.a('function');
  });

  describe('when passing no arguments', () => {
    it('should return an empty object', () => {
      expect(createAsyncConstants()).to.deep.equal({});
    });
  });

  describe('when passing one argument', () => {
    it('should return an object with the correct mappings', () => {
      expect(createAsyncConstants('pasta')).to.deep.equal({
        pasta: null,
        pasta_SUCCESS: null,
        pasta_FAILURE: null,
        pasta_DISMISS_SUCCESS_ALERT: null,
        pasta_DISMISS_FAILURE_ALERT: null
      });
    });
  });

  describe('when passing two arguments', () => {
    it('should return an object with the correct mappings', () => {
      expect(createAsyncConstants('pasta', 'spaghetti')).to.deep.equal({
        pasta: null,
        pasta_SUCCESS: null,
        pasta_FAILURE: null,
        pasta_DISMISS_SUCCESS_ALERT: null,
        pasta_DISMISS_FAILURE_ALERT: null,
        spaghetti: null,
        spaghetti_SUCCESS: null,
        spaghetti_FAILURE: null,
        spaghetti_DISMISS_SUCCESS_ALERT: null,
        spaghetti_DISMISS_FAILURE_ALERT: null
      });
    });
  });
});
