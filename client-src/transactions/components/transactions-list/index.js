import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import TransactionListItem from '../transaction-list-item';
import * as transactionsActionCreators from '../../../redux/transactions/action-creators';

function getTransactionsList(transactions, transactionsActions) {
  return transactions.map(t => (
    <TransactionListItem
      key={t.id}
      transaction={t}
      deleteTransaction={transactionsActions.deleteTransaction}
      updateTransaction={transactionsActions.updateTransaction}/>
  ));
}

export const TransactionsList = React.createClass({
  render() {
    const {transactions, transactionsActions} = this.props;
    var children = getTransactionsList(transactions, transactionsActions);

    return (
      <div className="transaction-list resource-list-container">
        <ul className="resource-list">
          {children}
        </ul>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList);
