import React from 'react';
import {Content} from '../../../../../client-src/categories/components/content';
import Subheader from '../../../../../client-src/categories/components/subheader';
import CategoriesList from '../../../../../client-src/categories/components/categories-list';
import EmptyCategories from '../../../../../client-src/categories/components/empty-categories';
import ErrorRetrieving from '../../../../../client-src/common/components/error-retrieving';
import LoadingResourceList from '../../../../../client-src/common/components/loading-resource-list';
import generateWrapperGenerator from '../../../../services/generate-wrapper-generator';

describe('CategoriesContent', function() {
  describe('rendering', () => {
    beforeEach(() => {
      this.mockXhrAbort = stub();
      this.mockXhr = {
        abort: this.mockXhrAbort
      };

      this.mockCategoriesActions = {
        resetRetrieveCategoriesResolution: stub(),
        retrieveCategories: stub().returns(this.mockXhr)
      };

      this.mockCategories = [{id: 1}, {id: 2}];

      this.defaultProps = {
        categoriesActions: this.mockCategoriesActions,
        categories: this.mockCategories,
        retrieveCategoriesStatus: null
      };

      this.generator = generateWrapperGenerator(this.defaultProps, Content);
    });

    it('should call `retrieveCategories` on mount', () => {
      const wrapper = this.generator.shallow();
      wrapper.instance().componentDidMount();
      expect(this.mockCategoriesActions.retrieveCategories).to.have.been.calledOnce;
    });

    describe('unmounting', () => {
      it('should call `abort` on the xhr', () => {
        const wrapper = this.generator.shallow();
        wrapper.instance().componentDidMount();
        wrapper.instance().componentWillUnmount();
        expect(this.mockXhrAbort).to.have.been.calledOnce;
      });

      it('should call `resetRetrieveCategoriesResolution`', () => {
        const wrapper = this.generator.shallow();
        wrapper.instance().componentDidMount();
        wrapper.instance().componentWillUnmount();
        const fn = this.mockCategoriesActions.resetRetrieveCategoriesResolution;
        expect(fn).to.have.been.calledOnce;
      });
    });

    it('should render a SubHeader', () => {
      const wrapper = this.generator.shallow();
      expect(wrapper.contains(<Subheader/>)).to.be.true;
    });

    it('should render a LoadingResourceList when the status is PENDING', () => {
      const wrapper = this.generator.shallow({
        retrievingCategoriesStatus: 'PENDING'
      });
      expect(wrapper.contains(<LoadingResourceList/>)).to.be.true;
    });

    it('should render an ErrorRetrieving when the status is FAILURE', () => {
      const wrapper = this.generator.shallow({
        retrievingCategoriesStatus: 'FAILURE'
      });
      const errorRetrieving = (
        <ErrorRetrieving
          retry={this.mockCategoriesActions.retrieveCategories}
          resourceName="Categories"/>
      );
      expect(wrapper.contains(errorRetrieving)).to.be.true;
    });

    it('should render an EmptyCategories when there are no categories', () => {
      const wrapper = this.generator.shallow({
        categories: []
      });
      expect(wrapper.contains(<EmptyCategories/>)).to.be.true;
    });

    it('should render a CategoriesList when there are categories', () => {
      const wrapper = this.generator.shallow();
      expect(wrapper.contains(<CategoriesList/>)).to.be.true;
    });
  });
});
