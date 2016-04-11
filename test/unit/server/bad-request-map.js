import requestErrorMap from '../../../server/api/util/bad-request-map';

describe('requestErrorMap', () => {
  it('should be a function', () => {
    expect(requestErrorMap).to.be.a('function');
  });

  describe('when passing in nothing', () => {
    it('should return an empty Array', () => {
      expect(requestErrorMap()).to.deep.equal([]);
    });
  });

  describe('when passing an empty Array', () => {
    it('should return an empty Array', () => {
      expect(requestErrorMap([])).to.deep.equal([]);
    });
  });

  describe('when passing a single is-my-json-valid error', () => {
    it('should return an empty Array', () => {
      var input = [{
        field: 'data.hello',
        message: 'is required'
      }];

      var expected = [{
        status: '400',
        title: 'Bad Request',
        detail: '"hello" is required'
      }];

      expect(requestErrorMap(input)).to.deep.equal(expected);
    });
  });

  describe('when passing multiple is-my-json-valid errors', () => {
    it('should return an empty Array', () => {
      var input = [{
        field: 'data.hello',
        message: 'is required'
      }, {
        field: 'data.id',
        message: 'is the wrong type'
      }];

      var expected = [{
        status: '400',
        title: 'Bad Request',
        detail: '"hello" is required'
      }, {
        status: '400',
        title: 'Bad Request',
        detail: '"id" is the wrong type'
      }];

      expect(requestErrorMap(input)).to.deep.equal(expected);
    });
  });
});
