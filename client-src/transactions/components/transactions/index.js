import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Transaction from '../transaction';
import * as transactionsActionCreators from '../../../redux/transactions/action-creators';

function getTransactionsList(transactions, transactionsActions) {
  return transactions.map(t => (
    <Transaction
      key={t.id}
      transaction={t}
      deleteTransaction={transactionsActions.deleteTransaction}
      updateTransaction={transactionsActions.updateTransaction}/>
  ));
}

function getLoadingState() {
  return (<div>Loading transactions.</div>);
}

function getEmptyTransactions() {
  return (<div>There are no transactions.</div>);
}

export const Transactions = React.createClass({
  componentDidMount() {
    const {transactionsActions} = this.props;
    transactionsActions.retrieveTransactions();
  },

  render() {
    const {transactions, transactionsActions} = this.props;
    var children;

    if (!transactions) {
      children = getLoadingState();
    } else if (!transactions.length) {
      children = getEmptyTransactions();
    } else {
      children = getTransactionsList(transactions, transactionsActions);
    }

    return (
      <ul className="transactions">
        {children}
      </ul>
    );
  }
});

function mapStateToProps(state) {
  return {
    transactions: state.transactions.transactions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    transactionsActions: bindActionCreators(transactionsActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
