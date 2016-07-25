import _ from 'lodash';
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as transactionsActionCreators from '../../../redux/transactions/action-creators';
import * as categoriesActionCreators from '../../../redux/categories/action-creators';
import Subheader from '../subheader';
import DateMenu from '../date-menu';
import TransactionsList from '../transactions-list';
import EmptyTransactions from '../empty-transactions';
import ErrorRetrieving from '../../../common/components/error-retrieving';
import LoadingResourceList from '../../../common/components/loading-resource-list';
import NotFound from '../../../common/components/not-found';
import validateTransactionDate from '../../services/validate-transaction-date';

export const Transactions = React.createClass({
  // When the component is mounted, we make sure that we have the latest
  // categories and the transactions for the current date
  componentWillMount() {
    const {params, categoriesActions} = this.props;
    this.fetchTransactions(params.transactionDate);
    categoriesActions.retrieveCategories();
  },

  getContents() {
    const {
      retrievingTransactions, transactions,
      transactionsActions, retrieveTransactionsFailure,
      params, retrievingCategories
    } = this.props;

    const date = params.transactionDate;
    const transactionsToDisplay = _.chain(transactions)
      // This is the first 7 characters of the date, which is the year
      // and month:
      // 2014-06-10
      // 1234567
      // This is used to match the date in the URL for this route
      .filter(t => t.date.substring(0, 7) === date)
      .sortBy('date')
      .value();

    if (retrievingTransactions || retrievingCategories) {
      return <LoadingResourceList/>;
    }

    if (retrieveTransactionsFailure) {
      return (<ErrorRetrieving
        retry={transactionsActions.retrieveTransactions}
        resourceName="Transactions"/>);
    }

    if (!transactionsToDisplay.length) {
      return <EmptyTransactions/>;
    }

    return (
      <TransactionsList transactions={transactionsToDisplay}/>
    );
  },

  fetchTransactions(date) {
    const {transactionsActions} = this.props;
    const transactionDate = date.split('-');
    transactionsActions.retrieveTransactions({
      year: transactionDate[0],
      month: transactionDate[1]
    });
  },

  componentWillReceiveProps(nextProps) {
    // Anytime the date changes, we need to fetch new transactions
    if (this.props.params.transactionDate !== nextProps.params.transactionDate) {
      this.fetchTransactions(nextProps.params.transactionDate);
    }
  },

  render() {
    const transactionDate = this.props.params.transactionDate;
    if (!validateTransactionDate(transactionDate)) {
      return <NotFound/>;
    }

    return (
      <div>
        <Subheader/>
        <DateMenu date={transactionDate}/>
        {this.getContents()}
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    transactions: state.transactions.transactions,
    retrievingTransactions: state.transactions.retrievingTransactions,
    retrievingCategories: state.categories.retrievingCategories,
    retrieveTransactionsFailure: state.transactions.retrieveTransactionsFailure,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    transactionsActions: bindActionCreators(transactionsActionCreators, dispatch),
    categoriesActions: bindActionCreators(categoriesActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
