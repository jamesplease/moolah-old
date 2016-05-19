import React from 'react';
import {bindActionCreators} from 'redux';
import * as transactionsActionsCreators from '../../../redux/transactions/action-creators';

export function TransactionsSubheader({isOnline, transactionsActions}) {
  const disabled = isOnline ? false : true;

  function onClickNew() {
    transactionsActions.createTransaction({
      value: Math.random(),
      description: 'Hot off the press',
      date: '2015-10-02'
    });
  }

  return (
    <div className="sub-header">
      <div className="container">
        <h1 className="subheader-title">
          Transactions
        </h1>
        <button
          className="subheader-action"
          onClick={onClickNew}
          disabled={disabled}>
          + Transaction
        </button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isOnline: state.connection
  };
}

function mapDispatchToProps(dispatch) {
  return {
    transactionsActions: bindActionCreators(transactionsActionsCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsSubheader);
