import _ from 'lodash';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import TransactionListItem from '../transaction-list-item';
import * as transactionsActionCreators from '../../../redux/transactions/action-creators';
import {getDayFromDate} from '../../services/format-date';

export class TransactionsList extends Component {
  render() {
    const {transactions, transactionsActions} = this.props;

    const sortedTransactions = _.sortBy(
      transactions,
      t => -Number(getDayFromDate(t.date)),
      'amount'
    );

    return (
      <div className="resourceListContainer">
        <ul className="resourceList">
          {sortedTransactions.map(t => (
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
}

function mapDispatchToProps(dispatch) {
  return {
    transactionsActions: bindActionCreators(transactionsActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(TransactionsList);
