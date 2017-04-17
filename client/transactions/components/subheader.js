import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as transactionsActionsCreators from '../../state/transactions/action-creators';

export function TransactionsSubheader({isOnline, transactionsActions}) {
  const disabled = !isOnline;

  function onClickNew() {
    transactionsActions.createTransaction({
      attributes: {
        value: Math.random(),
        description: 'Hot off the press',
        date: '2017-04-10'
      }
    });
  }

  return (
    <div className="subheader listHeader">
      <div className="container">
        <h1 className="subheader-title">
          Transactions
        </h1>
        <button
          className="subheader-action btn"
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
