import generateRequireAuth from '../../../../../client-src/common/services/require-auth';

describe('generateRequireAuth', function() {
  beforeEach(() => {
    this.nextState = {
      location: {
        pathname: 'oink'
      }
    };

    this.replace = stub();
  });

  describe('when there is no auth.user', () => {
    beforeEach(() => {
      this.store = {
        getState() {
          return {
            auth: {
              user: null
            }
          };
        }
      };
    });

    it('should return a fn', () => {
      expect(generateRequireAuth(this.store)).to.be.a('function');
    });

    it('should not call `replace` when called', () => {
      const requireAuth = generateRequireAuth(this.store);
      requireAuth(this.nextState, this.replace);
      expect(this.replace).to.not.have.been.called;
    });
  });

  describe('when there is an auth.user', () => {
    beforeEach(() => {
      this.store = {
        getState() {
          return {
            auth: {
              user: {}
            }
          };
        }
      };
    });

    it('should return a fn', () => {
      expect(generateRequireAuth(this.store)).to.be.a('function');
    });

    it('should call `replace` when called with the right args', () => {
      const requireAuth = generateRequireAuth(this.store);
      requireAuth(this.nextState, this.replace);
      expect(this.replace).to.have.been.calledOnce;
      expect(this.replace).to.have.been.calledWithExactly({
        pathname: '/login',
        state: {nextPathname: 'oink'}
      });
    });
  });
});
