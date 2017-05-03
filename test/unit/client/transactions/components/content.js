import React from 'react';
import {shallow} from 'enzyme';
import {Content} from '../../../../../client/transactions/components/content';
import Subheader from '../../../../../client/transactions/components/subheader';
import DateMenu from '../../../../../client/transactions/components/date-menu';
import TransactionsList from '../../../../../client/transactions/components/transactions-list';
import LoadingResourceList from '../../../../../client/common/components/loading-resource-list';
import ErrorRetrieving from '../../../../../client/common/components/error-retrieving';
import NotFound from '../../../../../client/common/components/not-found';
import EmptyTransactions from '../../../../../client/transactions/components/empty-transactions';

describe('TransactionsContent', function() {
  describe('rendering', () => {
    beforeEach(() => {
      this.mockFetchCategoriesXhr = {abort: stub()};
      this.mockFetchTransactionsXhr = {abort: stub()};

      this.mockCategoriesActions = {
        readManyCategories: stub().returns(this.mockFetchCategoriesXhr),
      };

      this.mockTransactionsActions = {
        resetRetrieveCategoriesResolution: stub(),
        readManyTransactions: stub().returns(this.mockFetchTransactionsXhr),
      };

      this.mockTransactions = [
        {id: 15, attributes: {date: '2015-07-10'}},
        {id: 25, attributes: {date: '2015-10-10'}}
      ];

      this.defaultProps = {
        params: {
          transactionDate: '2015-07'
        },
        categoriesActions: this.mockCategoriesActions,
        transactionsActions: this.mockTransactionsActions,
        transactions: this.mockTransactions,
        retrievingCategoriesStatus: null,
        retrievingTransactionsStatus: null
      };
    });

    it('should fetch resources before mounting', () => {
      shallow(<Content {...this.defaultProps}/>);
      expect(this.mockCategoriesActions.readManyCategories).to.have.been.calledOnce;
      expect(this.mockTransactionsActions.readManyTransactions).to.have.been.calledOnce;
      expect(this.mockTransactionsActions.readManyTransactions).to.have.been.calledWithExactly({
        year: '2015',
        month: '07'
      });
    });

    it('should fetch resources when a new date is received that is different', () => {
      const wrapper = shallow(<Content {...this.defaultProps}/>);
      this.mockCategoriesActions.readManyCategories.reset();
      this.mockTransactionsActions.readManyTransactions.reset();
      wrapper.setProps({
        params: {
          transactionDate: '2015-08'
        }
      });
      expect(this.mockCategoriesActions.readManyCategories).to.have.been.calledOnce;
      expect(this.mockTransactionsActions.readManyTransactions).to.have.been.calledOnce;
      expect(this.mockTransactionsActions.readManyTransactions).to.have.been.calledWithExactly({
        year: '2015',
        month: '08'
      });
    });

    it('should not fetch resources when a new date is received that is the same', () => {
      const wrapper = shallow(<Content {...this.defaultProps}/>);
      this.mockCategoriesActions.readManyCategories.reset();
      this.mockTransactionsActions.readManyTransactions.reset();
      wrapper.setProps({
        params: {
          transactionDate: '2015-07'
        }
      });
      expect(this.mockCategoriesActions.readManyCategories).to.not.have.been.called;
      expect(this.mockTransactionsActions.readManyTransactions).to.not.have.been.called;
    });

    describe('unmounting', () => {
      it('should call `abort` on the xhrs', () => {
        const wrapper = shallow(<Content {...this.defaultProps}/>);
        wrapper.instance().componentWillUnmount();
        expect(this.mockFetchCategoriesXhr.abort).to.have.been.calledOnce;
        expect(this.mockFetchTransactionsXhr.abort).to.have.been.calledOnce;
      });
    });

    it('should render a SubHeader', () => {
      const wrapper = shallow(<Content {...this.defaultProps}/>);
      expect(wrapper.contains(<Subheader/>)).to.be.true;
    });

    it('should render a DateMenu', () => {
      const wrapper = shallow(<Content {...this.defaultProps}/>);
      const dateMenu = (<DateMenu date="2015-07"/>);
      expect(wrapper.contains(dateMenu)).to.be.true;
    });

    it('should render a NotFound when an invalid date is passed', () => {
      const props = {
        ...this.defaultProps,
        params: {
          transactionDate: 'asdf'
        }
      };
      const wrapper = shallow(<Content {...props}/>);
      expect(wrapper.contains(<NotFound/>)).to.be.true;
    });

    it('should render a LoadingResourceList when the categories retrieve status is PENDING', () => {
      const props = {
        ...this.defaultProps,
        retrievingCategoriesStatus: 'PENDING'
      };
      const wrapper = shallow(<Content {...props}/>);
      expect(wrapper.contains(<LoadingResourceList/>)).to.be.true;
    });

    it('should render a LoadingResourceList when the transactions retrieve status is PENDING', () => {
      const props = {
        ...this.defaultProps,
        retrievingTransactionsStatus: 'PENDING'
      };
      const wrapper = shallow(<Content {...props}/>);
      expect(wrapper.contains(<LoadingResourceList/>)).to.be.true;
    });

    it('should render an ErrorRetrieving when the retrieve categories status is FAILURE', () => {
      const props = {
        ...this.defaultProps,
        retrievingCategoriesStatus: 'FAILURE'
      };
      const wrapper = shallow(<Content {...props}/>);
      const errorRetrieving = (
        <ErrorRetrieving
          retry={wrapper.instance().fetchResources}
          resourceName="Transactions"/>
      );
      expect(wrapper.contains(errorRetrieving)).to.be.true;
    });

    it('should render an ErrorRetrieving when the retrieve transactions status is FAILURE', () => {
      const props = {
        ...this.defaultProps,
        retrievingTransactionsStatus: 'FAILURE'
      };
      const wrapper = shallow(<Content {...props}/>);
      const errorRetrieving = (
        <ErrorRetrieving
          retry={wrapper.instance().fetchResources}
          resourceName="Transactions"/>
      );
      expect(wrapper.contains(errorRetrieving)).to.be.true;
    });

    it('should render an EmptyTransactions when there are no transactions', () => {
      const props = {
        ...this.defaultProps,
        transactions: []
      };
      const wrapper = shallow(<Content {...props}/>);
      expect(wrapper.contains(<EmptyTransactions/>)).to.be.true;
    });

    it('should render a TransactionsList when there are transactions', () => {
      const wrapper = shallow(<Content {...this.defaultProps}/>);
      const transactionsList = (<TransactionsList
        transactions={[{id: 15, attributes: {date: '2015-07-10'}}]}/>);
      expect(wrapper.contains(transactionsList)).to.be.true;
    });
  });
});
