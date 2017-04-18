import React from 'react';
import {formatDateForTransactionList} from '../services/format-date';

export default function Transaction(props) {
  const {transaction, onClickDelete, onClickEdit} = props;
  const attrs = transaction.attributes;

  return (
    <li className="resourceListItem">
      <button className="transactionListItem-btn" onClick={() => onClickEdit(transaction)}>
        <div className="transactionListItem-editBtn-container">
          <span className="transactionListItem-description">
            {attrs.description}
          </span>
          <span className="transactionListItem-date">
            {formatDateForTransactionList(attrs.date)}
          </span>
          <span className="transactionListItem-amount">
            {attrs.value}
          </span>
        </div>
      </button>
      <button
        className="resourceListItem-deleteBtn transactionListItem-deleteBtn"
        onClick={() => onClickDelete(transaction)}>
        ×
      </button>
    </li>
  );
}
