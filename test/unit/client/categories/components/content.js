import React from 'react';
import {
  Content, __Rewire__, __ResetDependency__, __get__
} from '../../../../../client-src/categories/components/content';
import Subheader from '../../../../../client-src/categories/components/subheader';
import CategoriesList from '../../../../../client-src/categories/components/categories-list';
import EmptyCategories from '../../../../../client-src/categories/components/empty-categories';
import ErrorRetrieving from '../../../../../client-src/common/components/error-retrieving';
import LoadingResourceList from '../../../../../client-src/common/components/loading-resource-list';
import generateWrapperGenerator from '../../../../services/generate-wrapper-generator';

const mapStateToProps = __get__('mapStateToProps');
const mapDispatchToProps = __get__('mapDispatchToProps');

describe('CategoriesContent', function() {
  describe('mapStateToProps', () => {
    it('returns the right props', () => {
      expect(mapStateToProps({
        categories: {
          categories: [1, 2, 3],
          retrievingCategoriesStatus: 'hello'
        },
        transactions: {},
        oink: true
      })).to.deep.equal({
        categories: [1, 2, 3],
        retrievingCategoriesStatus: 'hello'
      });
    });
  });

  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      this.retrieveCategories = stub().returns({pasta: true});
      __Rewire__('categoriesActionCreators', {
        retrieveCategories: this.retrieveCategories
      });

      this.dispatch = stub();
      this.props = mapDispatchToProps(this.dispatch);
    });

    afterEach(() => {
      __ResetDependency__('categoriesActionCreators');
    });

    it('returns the right props', () => {
      expect(this.props).to.have.keys(['retrieveCategories']);
    });

    it('returns a functioning `retrieveCategories`', () => {
      this.props.retrieveCategories();
      expect(this.retrieveCategories).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledWithExactly({pasta: true});
    });
  });

  describe('rendering', () => {
    beforeEach(() => {
      this.mockXhrAbort = stub();
      this.mockXhr = {
        abort: this.mockXhrAbort
      };

      this.mockCategories = [{id: 1}, {id: 2}];

      this.retrieveCategories = stub().returns(this.mockXhr);

      this.defaultProps = {
        retrieveCategories: this.retrieveCategories,
        categories: this.mockCategories,
        retrieveCategoriesStatus: null
      };

      this.generator = generateWrapperGenerator(this.defaultProps, Content);
    });

    it('should call `retrieveCategories` on mount', () => {
      const wrapper = this.generator.shallow();
      wrapper.instance().componentDidMount();
      expect(this.retrieveCategories).to.have.been.calledOnce;
    });

    describe('unmounting', () => {
      it('should call `abort` on the xhr', () => {
        const wrapper = this.generator.shallow();
        wrapper.instance().componentDidMount();
        wrapper.instance().componentWillUnmount();
        expect(this.mockXhrAbort).to.have.been.calledOnce;
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
          retry={this.retrieveCategories}
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
