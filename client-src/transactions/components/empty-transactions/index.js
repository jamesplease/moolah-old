import React from 'react';

export default function EmptyTransactions() {
  return (
    <div className="empty-resource-list">
      <div className="empty-resource-list-message">
        There are no transactions.
      </div>
      <div className="empty-resource-list-explanation">
        This page will list all of your transactions. If you've earned or
        spent any money, it'll show up here.
      </div>
    </div>
  );
}
