import yo from 'yo-yo';
import store from '../../../redux/store';
import {deleteTransaction} from '../../../redux/transactions/action-creators';

export default function(transaction) {
  function deleteSelf() {
    store.dispatch(deleteTransaction(transaction.id));
  }

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
      <button className="delete-transaction" onclick=${deleteSelf}>
        Delete
      </button>
    </li>
  `;
}
