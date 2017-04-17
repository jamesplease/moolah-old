import reducer from '../../../../../client/state/categories/reducer';
import initialState from '../../../../../client/state/categories/initial-state';
import actionTypes from '../../../../../client/state/categories/action-types';

describe('categories/reducer', function() {
  describe('An action with no type', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.deep.equal(initialState);
    });
  });

  describe('CREATE_CATEGORY', () => {
    it('should return a new state with `creatingCategoryStatus` set to PENDING', () => {
      const state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}],
        creatingCategoryStatus: null
      };
      const action = {type: actionTypes.CREATE_CATEGORY};
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}],
        creatingCategoryStatus: 'PENDING'
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('CREATE_CATEGORY_SUCCESS', () => {
    it('should return a new state with `creatingCategoryStatus` set to SUCCESS and the category', () => {
      const state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      const action = {
        type: actionTypes.CREATE_CATEGORY_SUCCESS,
        resource: {
          id: 4,
          pasta: 'yum'
        }
      };
      var newState = {
        resources: [
          {id: 1},
          {id: 2},
          {id: 3},
          {id: 4, pasta: 'yum'}
        ],
        resourcesMeta: [
          {id: 1},
          {id: 2},
          {id: 3},
          {id: 4, updatingStatus: null, isDeleting: false}
        ],
        creatingCategoryStatus: 'SUCCESS'
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('CREATE_CATEGORY_FAILURE', () => {
    it('should return a new state with `creatingCategoryStatus` set to FAILURE', () => {
      const state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}],
        creatingCategoryStatus: 'PENDING'
      };
      const action = {
        type: actionTypes.CREATE_CATEGORY_FAILURE,
        resource: {
          id: 4,
          pasta: 'yum'
        }
      };
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}],
        creatingCategoryStatus: 'FAILURE'
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('CREATE_CATEGORY_ABORTED', () => {
    it('should return a new state with `creatingCategoryStatus` set to null', () => {
      const state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}],
        creatingCategoryStatus: 'PENDING'
      };
      const action = {
        type: actionTypes.CREATE_CATEGORY_ABORTED,
        resource: {
          id: 4,
          pasta: 'yum'
        }
      };
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}],
        creatingCategoryStatus: null
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('CREATE_CATEGORY_RESET_RESOLUTION', () => {
    it('should return a new state with `creatingCategoryStatus` set to null', () => {
      const state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}],
        creatingCategoryStatus: 'PENDING'
      };
      const action = {type: actionTypes.CREATE_CATEGORY_RESET_RESOLUTION};
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}],
        creatingCategoryStatus: null
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

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
        resources: [{id: 2, name: 'pizza'}, {id: 5, name: 'sandwich'}]
      };
      var newState = {
        oink: true,
        resources: [{id: 2, name: 'pizza'}, {id: 5, name: 'sandwich'}],
        resourcesMeta: [
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

  describe('RETRIEVE_CATEGORIES_ABORTED', () => {
    it('should set `retrievingCategoriesStatus` to null', () => {
      const state = {oink: true};
      const action = {type: actionTypes.RETRIEVE_CATEGORIES_ABORTED};
      var newState = {
        oink: true,
        retrievingCategoriesStatus: null
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
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      const action = {
        type: actionTypes.UPDATE_CATEGORY,
        resource: {
          id: 2
        }
      };
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [
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
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      const action = {
        type: actionTypes.UPDATE_CATEGORY_SUCCESS,
        resource: {
          id: 2,
          pasta: 'yum'
        }
      };
      var newState = {
        resources: [
          {id: 1},
          {id: 2, pasta: 'yum'},
          {id: 3}
        ],
        resourcesMeta: [
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
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      const action = {
        type: actionTypes.UPDATE_CATEGORY_FAILURE,
        resource: {
          id: 2
        }
      };
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [
          {id: 1},
          {id: 2, updatingStatus: 'FAILURE'},
          {id: 3}
        ]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('UPDATE_CATEGORY_ABORTED', () => {
    it('should return a new state with `updatingStatus` set to `null` for that category', () => {
      const state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [
          {id: 1},
          {id: 2, updatingStatus: 'FAILURE'},
          {id: 3}
        ]
      };
      const action = {
        type: actionTypes.UPDATE_CATEGORY_ABORTED,
        resource: {
          id: 2
        }
      };
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [
          {id: 1},
          {id: 2, updatingStatus: null},
          {id: 3}
        ]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('UPDATE_CATEGORY_RESET_RESOLUTION', () => {
    it('should return a new state with `updatingStatus` set to `null` for that category', () => {
      const state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [
          {id: 1},
          {id: 2, updatingStatus: 'FAILURE'},
          {id: 3}
        ]
      };
      const action = {
        type: actionTypes.UPDATE_CATEGORY_RESET_RESOLUTION,
        resource: {
          id: 2
        }
      };
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [
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
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      action = {
        type: actionTypes.DELETE_CATEGORY,
        resource: {
          id: 2
        }
      };
    });

    it('should return a new state with `isDeleting` set to true for that category', () => {
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [
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
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      action = {
        type: actionTypes.DELETE_CATEGORY_SUCCESS,
        resource: {
          id: 2
        }
      };
    });

    it('should return a new state without the category in categories', () => {
      var newState = {
        resources: [{id: 1}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 3}]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('DELETE_CATEGORY_FAILURE', () => {
    let state, action;
    beforeEach(() => {
      state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      action = {
        type: actionTypes.DELETE_CATEGORY_FAILURE,
        resource: {
          id: 2
        }
      };
    });

    it('should return a new state with `isDeleting` set to false for that category', () => {
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [
          {id: 1},
          {id: 2, isDeleting: false},
          {id: 3}
        ]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });

  describe('DELETE_CATEGORY_ABORTED', () => {
    let state, action;
    beforeEach(() => {
      state = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [{id: 1}, {id: 2}, {id: 3}]
      };
      action = {
        type: actionTypes.DELETE_CATEGORY_FAILURE,
        resource: {
          id: 2
        }
      };
    });

    it('should return a new state with `isDeleting` set to false for that category', () => {
      var newState = {
        resources: [{id: 1}, {id: 2}, {id: 3}],
        resourcesMeta: [
          {id: 1},
          {id: 2, isDeleting: false},
          {id: 3}
        ]
      };
      expect(reducer(state, action)).to.deep.equal(newState);
    });
  });
});
