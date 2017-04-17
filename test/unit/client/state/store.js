import store from '../../../../client/state/store';

describe('redux store', () => {
  it('should have the right shape', () => {
    expect(store).to.contain.keys(
      'dispatch',
      'getState'
    );
  });
});
