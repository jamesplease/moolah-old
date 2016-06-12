import reducer from '../../../../../client-src/redux/categories/reducer';
// import initialState from '../../../../../client-src/redux/categories/initial-state';
import actionTypes from '../../../../../client-src/redux/categories/action-types';

// passing a category id should return a new state without that category

describe('categories: reducer', () => {
  describe('DELETE_CATEGORY_SUCCESS', () => {
    let state, action;
    beforeEach(() => {
      state = {categories: [{id: 1}, {id: 2}, {id: 3}]};
      action = {
        type: actionTypes.DELETE_CATEGORY_SUCCESS,
        categoryId: 2
      };
    });

    it('should return a new state without the category in categories', () => {
      var newState = {
        categories: [{id: 1}, {id: 3}],
        deletingCategory: false,
        deleteCategorySuccess: true
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });
});
