import React from 'react';
import {formatDateForTransactionList} from '../../services/format-date';

export default function Transaction(props) {
  const {transaction} = props;

  return (
    <li className="resourceListItem">
      <button className="transactionListItem-btn">
        <div className="transactionListItem-editBtn-container">
          <span className="transactionListItem-description">
            {transaction.description}
          </span>
          <span className="transactionListItem-date">
            {formatDateForTransactionList(transaction.date)}
          </span>
          <span className="transactionListItem-amount">
            {transaction.amount}
          </span>
        </div>
      </button>
      <button className="resourceListItem-deleteBtn transactionListItem-deleteBtn">
        ×
      </button>
    </li>
  );
}
