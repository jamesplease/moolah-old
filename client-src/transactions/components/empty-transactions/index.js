import React from 'react';

export default function EmptyTransactions() {
  return (
    <div className="empty-resource-list">
      <div className="empty-resource-list-message">
        There are no transactions.
      </div>
      <div className="empty-resource-list-explanation">
        This page will list your transactions. Transactions are events when you
        gain or spend money.
      </div>
    </div>
  );
}
