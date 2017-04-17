import generateAuthCheck from '../../../../../client/common/services/auth-check';

describe('generateAuthCheck', function() {
  beforeEach(() => {
    this.nextState = {
      location: {
        pathname: 'oink'
      }
    };

    this.replace = stub();
  });

  describe('mustBeLoggedIn', () => {
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

        this.authCheck = generateAuthCheck(this.store);
      });

      it('should not call `replace` when called', () => {
        this.authCheck.mustBeLoggedIn(this.nextState, this.replace);
        expect(this.replace).to.not.have.been.called;
      });
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

        this.authCheck = generateAuthCheck(this.store);
      });

      it('should call `replace` when called with the right args', () => {
        this.authCheck.mustBeLoggedIn(this.nextState, this.replace);
        expect(this.replace).to.have.been.calledOnce;
        expect(this.replace).to.have.been.calledWithExactly({
          pathname: '/login',
          state: {nextPathname: 'oink'}
        });
      });
    });
  });

  describe('mustBeLoggedOut', () => {
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

        this.authCheck = generateAuthCheck(this.store);
      });

      it('should not call `replace` when called', () => {
        this.authCheck.mustBeLoggedOut(this.nextState, this.replace);
        expect(this.replace).to.have.been.calledOnce;
        expect(this.replace).to.have.been.calledWithExactly({
          pathname: '/',
          state: undefined
        });
      });
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

        this.authCheck = generateAuthCheck(this.store);
      });

      it('should call `replace` when called with the right args', () => {
        this.authCheck.mustBeLoggedOut(this.nextState, this.replace);
        expect(this.replace).to.not.have.been.called;
      });
    });
  });
});
