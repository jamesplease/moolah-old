import loadInitialData from '../../../../../client-src/common/services/load-initial-data';

describe('loadInitialData', function() {
  it('should return {} when there is no initial data element', () => {
    expect(loadInitialData()).to.deep.equal({});
  });

  describe('when there is an initial data element, but it has no contents', () => {
    beforeEach(() => {
      this.el = document.createElement('div');
      this.el.id = 'initial-data';
      document.body.appendChild(this.el);
    });

    afterEach(() => {
      this.el.remove();
    });

    it('should return {}', () => {
      expect(loadInitialData()).to.deep.equal({});
    });
  });

  describe('when there is an initial data element with contents', () => {
    beforeEach(() => {
      this.el = document.createElement('div');
      this.el.id = 'initial-data';
      this.el.textContent = '{"data": true}';
      document.body.appendChild(this.el);
    });

    afterEach(() => {
      this.el.remove();
    });

    it('should return {}', () => {
      expect(loadInitialData()).to.deep.equal({data: true});
    });
  });
});
