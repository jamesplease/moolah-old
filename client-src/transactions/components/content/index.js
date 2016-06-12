import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as transactionsActionCreators from '../../../redux/transactions/action-creators';
import Subheader from '../subheader';
import TransactionsList from '../transactions-list';
import EmptyTransactions from '../empty-transactions';
import ErrorRetrieving from '../../../common/components/error-retrieving';
import LoadingResourceList from '../../../common/components/loading-resource-list';

export const Transactions = React.createClass({
  componentDidMount() {
    const {transactionsActions} = this.props;
    transactionsActions.retrieveTransactions();
  },

  getContents() {
    const {
      retrievingTransactions, transactions,
      transactionsActions, retrieveTransactionsFailure
    } = this.props;

    if (retrievingTransactions) {
      return <LoadingResourceList/>;
    }

    if (retrieveTransactionsFailure) {
      return (<ErrorRetrieving
        retry={transactionsActions.retrieveTransactions}
        resourceName="Transactions"/>);
    }

    if (!transactions.length) {
      return <EmptyTransactions/>;
    }

    return (<TransactionsList/>);
  },

  render() {
    return (
      <div>
        <Subheader/>
        {this.getContents()}
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    transactions: state.transactions.transactions,
    retrievingTransactions: state.transactions.retrievingTransactions,
    retrieveTransactionsFailure: state.transactions.retrieveTransactionsFailure,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    transactionsActions: bindActionCreators(transactionsActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
