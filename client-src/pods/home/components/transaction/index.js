import yo from 'yo-yo';

export default function(transaction) {
  return yo`
    <li className="transaction">
      <span className="transaction-date">
        ${transaction.date}
      </span>
      <span className="transaction-description">
        ${transaction.description || 'Anonymous'}
      </span>
      <span className="transaction-value">
        ${transaction.value}
      </span>
      <button className="delete-transaction">
        Delete
      </button>
    </li>
  `;
}
