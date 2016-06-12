import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import TransactionListItem from '../transaction-list-item';
import * as transactionsActionCreators from '../../../redux/transactions/action-creators';

export const TransactionsList = React.createClass({
  render() {
    const {transactions, transactionsActions} = this.props;

    return (
      <div className="transaction-list resource-list-container">
        <ul className="resource-list">
          {transactions.map(t => (
            <TransactionListItem
              key={t.id}
              transaction={t}
              deleteTransaction={transactionsActions.deleteTransaction}
              updateTransaction={transactionsActions.updateTransaction}/>
          ))}
        </ul>
      </div>
    );
  }
});

function mapDispatchToProps(dispatch) {
  return {
    transactionsActions: bindActionCreators(transactionsActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(TransactionsList);
