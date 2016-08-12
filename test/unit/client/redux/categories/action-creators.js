import xhr from 'xhr';
import sinon from 'sinon';
import * as actionCreators from '../../../../../client-src/redux/categories/action-creators';
import actionTypes from '../../../../../client-src/redux/categories/action-types';

describe('categories/actionCreators', function() {
  beforeEach(() => {
    useFakeXMLHttpRequest();
    xhr.XMLHttpRequest = sinon.FakeXMLHttpRequest;
    this.FakeXMLHttpRequest = sinon.FakeXMLHttpRequest;
    this.dispatch = stub();
    spy(xhr);
  });

  describe('resetCreateCategoryResolution', () => {
    it('should return the right action', () => {
      const result = actionCreators.resetCreateCategoryResolution();
      expect(result).to.deep.equal({
        type: actionTypes.CREATE_CATEGORY_RESET_RESOLUTION
      });
    });
  });

  describe('createCategory', () => {
    it('should dispatch a begin action before making the request', () => {
      const thunk = actionCreators.createCategory({label: 'pizza'});
      thunk(this.dispatch);
      expect(this.dispatch).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledWithExactly({
        type: actionTypes.CREATE_CATEGORY,
        category: {label: 'pizza'}
      });
      expect(this.dispatch).to.have.been.calledBefore(xhr.post);
    });

    it('should generate the expected request', () => {
      const thunk = actionCreators.createCategory({label: 'pizza'});
      const req = thunk(this.dispatch);
      expect(req).to.be.instanceof(this.FakeXMLHttpRequest);
      expect(req.url).to.equal('/api/v1/categories');
      expect(req.method).to.equal('POST');
      const expectedBody = JSON.stringify({label: 'pizza'});
      expect(req.requestBody).to.deep.equal(expectedBody);
    });

    it('should respond appropriately when there are no errors', () => {
      const thunk = actionCreators.createCategory({label: 'pizza'});
      const req = thunk(this.dispatch);
      const respBody = JSON.stringify({
        id: 10,
        label: 'pizza'
      });
      req.respond(200, {}, respBody);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.CREATE_CATEGORY_SUCCESS,
        category: {
          id: 10,
          label: 'pizza'
        }
      });
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.CREATE_CATEGORY_FAILURE,
        category: {
          id: 10,
          label: 'pizza'
        }
      });
    });

    it('should respond appropriately when aborted', () => {
      const thunk = actionCreators.createCategory({label: 'pizza'});
      const req = thunk(this.dispatch);
      req.abort();
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.CREATE_CATEGORY,
        category: {label: 'pizza'}
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.CREATE_CATEGORY_ABORTED,
        category: {label: 'pizza'}
      });
    });

    it('should respond appropriately when a error status code is returned', () => {
      const thunk = actionCreators.createCategory({label: 'pizza'});
      const req = thunk(this.dispatch);
      req.respond(500);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.CREATE_CATEGORY_SUCCESS,
        category: {label: 'pizza'}
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.CREATE_CATEGORY_FAILURE,
        category: {label: 'pizza'}
      });
    });
  });

  describe('resetRetrieveCategoriesResolution', () => {
    it('should return the right action', () => {
      const result = actionCreators.resetRetrieveCategoriesResolution();
      expect(result).to.deep.equal({
        type: actionTypes.RETRIEVE_CATEGORIES_RESET_RESOLUTION
      });
    });
  });

  describe('retrieveCategories', () => {
    it('should dispatch a begin action before making the request', () => {
      const thunk = actionCreators.retrieveCategories();
      thunk(this.dispatch);
      expect(this.dispatch).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledWithExactly({
        type: actionTypes.RETRIEVE_CATEGORIES
      });
      expect(this.dispatch).to.have.been.calledBefore(xhr.get);
    });

    it('should generate the expected request', () => {
      const thunk = actionCreators.retrieveCategories();
      const req = thunk(this.dispatch);
      expect(req).to.be.instanceof(this.FakeXMLHttpRequest);
      expect(req.url).to.equal('/api/v1/categories');
      expect(req.method).to.equal('GET');
    });

    it('should respond appropriately when there are no errors', () => {
      const thunk = actionCreators.retrieveCategories();
      const req = thunk(this.dispatch);
      const respBody = JSON.stringify([
        {id: 1},
        {id: 2}
      ]);
      req.respond(200, {}, respBody);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.RETRIEVE_CATEGORIES_SUCCESS,
        categories: [
          {id: 1},
          {id: 2}
        ]
      });
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.RETRIEVE_CATEGORIES_FAILURE
      });
    });

    it('should respond appropriately when aborted', () => {
      const thunk = actionCreators.retrieveCategories();
      const req = thunk(this.dispatch);
      req.abort();
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.RETRIEVE_CATEGORIES
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.RETRIEVE_CATEGORIES_ABORTED
      });
    });

    it('should respond appropriately when a error status code is returned', () => {
      const thunk = actionCreators.retrieveCategories();
      const req = thunk(this.dispatch);
      req.respond(500);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.RETRIEVE_CATEGORIES_SUCCESS,
        categories: undefined
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.RETRIEVE_CATEGORIES_FAILURE
      });
    });
  });

  describe('resetUpdateCategoryResolution', () => {
    it('should return the right action', () => {
      const result = actionCreators.resetUpdateCategoryResolution(2);
      expect(result).to.deep.equal({
        type: actionTypes.UPDATE_CATEGORY_RESET_RESOLUTION,
        categoryId: 2
      });
    });
  });

  describe('updateCategory', () => {
    it('should dispatch a begin action before making the request', () => {
      const thunk = actionCreators.updateCategory({id: 10, label: 'pizza'});
      thunk(this.dispatch);
      expect(this.dispatch).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledWithExactly({
        type: actionTypes.UPDATE_CATEGORY,
        category: {id: 10, label: 'pizza'}
      });
      expect(this.dispatch).to.have.been.calledBefore(xhr.patch);
    });

    it('should generate the expected request', () => {
      const thunk = actionCreators.updateCategory({id: 2, label: 'pizza'});
      const req = thunk(this.dispatch);
      expect(req).to.be.instanceof(this.FakeXMLHttpRequest);
      expect(req.url).to.equal('/api/v1/categories/2');
      expect(req.method).to.equal('PATCH');
      const expectedBody = JSON.stringify({id: 2, label: 'pizza'});
      expect(req.requestBody).to.deep.equal(expectedBody);
    });

    it('should respond appropriately when there are no errors', () => {
      const thunk = actionCreators.updateCategory({id: 2, label: 'pizza'});
      const req = thunk(this.dispatch);
      const respBody = JSON.stringify({
        id: 2,
        label: 'pizza'
      });
      req.respond(200, {}, respBody);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.UPDATE_CATEGORY_SUCCESS,
        category: {
          id: 2,
          label: 'pizza'
        }
      });
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.UPDATE_CATEGORY_FAILURE,
        category: {
          id: 2,
          label: 'pizza'
        }
      });
    });

    it('should respond appropriately when aborted', () => {
      const thunk = actionCreators.updateCategory({id: 2, label: 'pizza'});
      const req = thunk(this.dispatch);
      req.abort();
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.UPDATE_CATEGORY,
        category: {
          id: 2,
          label: 'pizza'
        }
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.UPDATE_CATEGORY_ABORTED,
        category: {
          id: 2,
          label: 'pizza'
        }
      });
    });

    it('should respond appropriately when a error status code is returned', () => {
      const thunk = actionCreators.updateCategory({id: 2, label: 'pizza'});
      const req = thunk(this.dispatch);
      req.respond(500);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.UPDATE_CATEGORY_SUCCESS,
        category: {
          id: 2,
          label: 'pizza'
        }
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.UPDATE_CATEGORY_FAILURE,
        category: {
          id: 2,
          label: 'pizza'
        }
      });
    });
  });

  describe('deleteCategory', () => {
    beforeEach(() => {
      this.getState = function() {
        return {
          categories: {
            categories: [
              {id: 2, label: 'pizza'},
              {id: 10, label: 'what'}
            ]
          }
        };
      };
    });

    it('should dispatch a begin action before making the request', () => {
      const thunk = actionCreators.deleteCategory(2);
      thunk(this.dispatch, this.getState);
      expect(this.dispatch).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledWithExactly({
        type: actionTypes.DELETE_CATEGORY,
        category: {
          id: 2,
          label: 'pizza'
        }
      });
      expect(this.dispatch).to.have.been.calledBefore(xhr.del);
    });

    it('should generate the expected request', () => {
      const thunk = actionCreators.deleteCategory(2);
      const req = thunk(this.dispatch, this.getState);
      expect(req).to.be.instanceof(this.FakeXMLHttpRequest);
      expect(req.url).to.equal('/api/v1/categories/2');
      expect(req.method).to.equal('DELETE');
    });

    it('should respond appropriately when there are no errors', () => {
      const thunk = actionCreators.deleteCategory(2);
      const req = thunk(this.dispatch, this.getState);
      req.respond(200);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.DELETE_CATEGORY_SUCCESS,
        category: {id: 2, label: 'pizza'}
      });
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.DELETE_CATEGORY_FAILURE,
        category: {id: 2, label: 'pizza'}
      });
    });

    it('should respond appropriately when aborted', () => {
      const thunk = actionCreators.deleteCategory(2);
      const req = thunk(this.dispatch, this.getState);
      req.abort();
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.DELETE_CATEGORY,
        category: {id: 2, label: 'pizza'}
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.DELETE_CATEGORY_ABORTED,
        category: {id: 2, label: 'pizza'}
      });
    });

    it('should respond appropriately when a error status code is returned', () => {
      const thunk = actionCreators.deleteCategory(2);
      const req = thunk(this.dispatch, this.getState);
      req.respond(500);
      expect(this.dispatch).to.have.been.calledTwice;
      expect(this.dispatch).to.not.have.been.calledWith({
        type: actionTypes.DELETE_CATEGORY_SUCCESS,
        category: {id: 2, label: 'pizza'}
      });
      expect(this.dispatch).to.have.been.calledWith({
        type: actionTypes.DELETE_CATEGORY_FAILURE,
        category: {id: 2, label: 'pizza'}
      });
    });
  });
});
