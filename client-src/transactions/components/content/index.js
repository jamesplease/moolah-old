import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as transactionsActionCreators from '../../../redux/transactions/action-creators';
import TransactionsList from '../transactions-list';
import LoadingPage from '../../../common/components/loading-page';
import EmptyTransactions from '../empty-transactions';

export const Transactions = React.createClass({
  componentDidMount() {
    const {transactionsActions} = this.props;
    transactionsActions.retrieveTransactions();
  },

  render() {
    const {
      retrievingTransactions, transactions
    } = this.props;

    if (retrievingTransactions) {
      return <LoadingPage/>;
    }

    if (!transactions.length) {
      return <EmptyTransactions/>;
    }

    return <TransactionsList/>;
  }
});

function mapStateToProps(state) {
  return {
    transactions: state.transactions.transactions,
    retrievingTransactions: state.transactions.retrievingTransactions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    transactionsActions: bindActionCreators(transactionsActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
