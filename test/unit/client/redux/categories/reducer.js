import reducer from '../../../../../client-src/redux/categories/reducer';
// import initialState from '../../../../../client-src/redux/categories/initial-state';
import actionTypes from '../../../../../client-src/redux/categories/action-types';

describe('categories/reducer', () => {
  describe('DELETE_CATEGORY', () => {
    let state, action;
    beforeEach(() => {
      state = {
        categories: [{id: 1}, {id: 2}, {id: 3}],
        categoriesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      action = {
        type: actionTypes.DELETE_CATEGORY,
        categoryId: 2
      };
    });

    it('should return a new state with `isDeleting` set to true for that category', () => {
      var newState = {
        categories: [{id: 1}, {id: 2}, {id: 3}],
        categoriesMeta: [
          {id: 1},
          {id: 2, isDeleting: true},
          {id: 3}
        ]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('DELETE_CATEGORY_SUCCESS', () => {
    let state, action;
    beforeEach(() => {
      state = {
        categories: [{id: 1}, {id: 2}, {id: 3}],
        categoriesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      action = {
        type: actionTypes.DELETE_CATEGORY_SUCCESS,
        categoryId: 2
      };
    });

    it('should return a new state without the category in categories', () => {
      var newState = {
        categories: [{id: 1}, {id: 3}],
        categoriesMeta: [{id: 1}, {id: 3}]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('DELETE_CATEGORY_FAILURE', () => {
    let state, action;
    beforeEach(() => {
      state = {
        categories: [{id: 1}, {id: 2}, {id: 3}],
        categoriesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      action = {
        type: actionTypes.DELETE_CATEGORY_FAILURE,
        categoryId: 2
      };
    });

    it('should return a new state with `isDeleting` set to false for that category', () => {
      var newState = {
        categories: [{id: 1}, {id: 2}, {id: 3}],
        categoriesMeta: [
          {id: 1},
          {id: 2, isDeleting: false},
          {id: 3}
        ]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });
});
