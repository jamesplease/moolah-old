import React from 'react';

export default function EmptyTransactions() {
  return (
    <div className="emptyResourceList">
      <div className="emptyResourceList-message">
        There are no transactions.
      </div>
      <div className="emptyResourceList-explanation">
        This page will list your transactions. Transactions are events where you
        gain or spend money.
      </div>
    </div>
  );
}
