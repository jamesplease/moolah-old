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

function getEmptyTransactions() {
  return (<div>There are no transactions.</div>);
}

export function Transactions({transactions, transactionsActions}) {
  var children;

  if (transactions && transactions.length) {
    children = getTransactionsList(transactions, transactionsActions);
  } else {
    children = getEmptyTransactions();
  }

  return (
    <ul className="transactions">
      {children}
    </ul>
  );
}

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
