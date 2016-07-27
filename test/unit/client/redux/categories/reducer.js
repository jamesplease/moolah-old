import reducer from '../../../../../client-src/redux/categories/reducer';
// import initialState from '../../../../../client-src/redux/categories/initial-state';
import actionTypes from '../../../../../client-src/redux/categories/action-types';

describe('categories/reducer', function() {
  describe('RETRIEVE_CATEGORIES', () => {
    it('should set `retrievingCategoriesStatus` to PENDING', () => {
      const state = {oink: true};
      const action = {type: actionTypes.RETRIEVE_CATEGORIES};
      var newState = {
        oink: true,
        retrievingCategoriesStatus: 'PENDING'
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('RETRIEVE_CATEGORIES_SUCCESS', () => {
    it('should set `retrievingCategoriesStatus` to SUCCESS while setting data', () => {
      const state = {oink: true};
      const action = {
        type: actionTypes.RETRIEVE_CATEGORIES_SUCCESS,
        categories: [{id: 2, name: 'pizza'}, {id: 5, name: 'sandwich'}]
      };
      var newState = {
        oink: true,
        categories: [{id: 2, name: 'pizza'}, {id: 5, name: 'sandwich'}],
        categoriesMeta: [
          {id: 2, updatingStatus: null, isDeleting: false},
          {id: 5, updatingStatus: null, isDeleting: false}
        ],
        retrievingCategoriesStatus: 'SUCCESS'
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('RETRIEVE_CATEGORIES_FAILURE', () => {
    it('should set `retrievingCategoriesStatus` to FAILURE', () => {
      const state = {oink: true};
      const action = {type: actionTypes.RETRIEVE_CATEGORIES_FAILURE};
      var newState = {
        oink: true,
        retrievingCategoriesStatus: 'FAILURE'
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('RETRIEVE_CATEGORIES_RESET_RESOLUTION', () => {
    it('should set `retrievingCategoriesStatus` to null', () => {
      const state = {oink: true};
      const action = {type: actionTypes.RETRIEVE_CATEGORIES_RESET_RESOLUTION};
      var newState = {
        oink: true,
        retrievingCategoriesStatus: null
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('UPDATE_CATEGORY', () => {
    it('should return a new state with `updatingStatus` set to PENDING for that category', () => {
      const state = {
        categories: [{id: 1}, {id: 2}, {id: 3}],
        categoriesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      const action = {
        type: actionTypes.UPDATE_CATEGORY,
        categoryId: 2
      };
      var newState = {
        categories: [{id: 1}, {id: 2}, {id: 3}],
        categoriesMeta: [
          {id: 1},
          {id: 2, updatingStatus: 'PENDING'},
          {id: 3}
        ]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('UPDATE_CATEGORY_SUCCESS', () => {
    it('should return a new state with `updatingStatus` set to SUCCESS for that category', () => {
      const state = {
        categories: [{id: 1}, {id: 2}, {id: 3}],
        categoriesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      const action = {
        type: actionTypes.UPDATE_CATEGORY_SUCCESS,
        category: {
          id: 2,
          pasta: 'yum'
        }
      };
      var newState = {
        categories: [
          {id: 1},
          {id: 2, pasta: 'yum'},
          {id: 3}
        ],
        categoriesMeta: [
          {id: 1},
          {id: 2, updatingStatus: 'SUCCESS'},
          {id: 3}
        ]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('UPDATE_CATEGORY_FAILURE', () => {
    it('should return a new state with `updatingStatus` set to FAILURE for that category', () => {
      const state = {
        categories: [{id: 1}, {id: 2}, {id: 3}],
        categoriesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      const action = {
        type: actionTypes.UPDATE_CATEGORY_FAILURE,
        categoryId: 2
      };
      var newState = {
        categories: [{id: 1}, {id: 2}, {id: 3}],
        categoriesMeta: [
          {id: 1},
          {id: 2, updatingStatus: 'FAILURE'},
          {id: 3}
        ]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('UPDATE_CATEGORY_RESET_RESOLUTION', () => {
    it('should return a new state with `updatingStatus` set to `null` for that category', () => {
      const state = {
        categories: [{id: 1}, {id: 2}, {id: 3}],
        categoriesMeta: [
          {id: 1},
          {id: 2, updatingStatus: 'FAILURE'},
          {id: 3}
        ]
      };
      const action = {
        type: actionTypes.UPDATE_CATEGORY_RESET_RESOLUTION,
        categoryId: 2
      };
      var newState = {
        categories: [{id: 1}, {id: 2}, {id: 3}],
        categoriesMeta: [
          {id: 1},
          {id: 2, updatingStatus: null},
          {id: 3}
        ]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

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
