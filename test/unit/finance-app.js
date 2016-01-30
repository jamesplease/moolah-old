import financeApp from '../../src/finance-app';

describe('financeApp', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(financeApp, 'greet');
      financeApp.greet();
    });

    it('should have been run once', () => {
      expect(financeApp.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(financeApp.greet).to.have.always.returned('hello');
    });
  });
});
