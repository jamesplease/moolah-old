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
        pasta_ABORTED: null,
        pasta_RESET_RESOLUTION: null,
      });
    });
  });

  describe('when passing two arguments', () => {
    it('should return an object with the correct mappings', () => {
      expect(createAsyncConstants('pasta', 'spaghetti')).to.deep.equal({
        pasta: null,
        pasta_SUCCESS: null,
        pasta_FAILURE: null,
        pasta_ABORTED: null,
        pasta_RESET_RESOLUTION: null,
        spaghetti: null,
        spaghetti_SUCCESS: null,
        spaghetti_FAILURE: null,
        spaghetti_ABORTED: null,
        spaghetti_RESET_RESOLUTION: null,
      });
    });
  });
});
