import yo from 'yo-yo';
import serialize from 'form-serialize';

import store from '../../../redux/store';
import {deleteTransaction, updateTransaction} from '../../../redux/transactions/action-creators';

export default function(transaction) {
  function deleteSelf() {
    store.dispatch(deleteTransaction(transaction.id));
  }

  const id = `transaction-form-${transaction.id}`;

  function updateSelf() {
    let form = document.getElementById(id);
    let formData = serialize(form, {hash: true});
    store.dispatch(updateTransaction(transaction.id, formData));
  }

  return yo`
    <li className="transaction">
      <form id="${id}">
        <input className="transaction-date" value="${transaction.date}" name="date"/>
        <input className="transaction-description" value="${transaction.description}" name="description"/>
        <input className="transaction-value" value="${transaction.value}" name="value"/>
      </form>
      <button className="save-transaction" onclick=${updateSelf}>
        Save
      </button>
      <button className="delete-transaction" onclick=${deleteSelf}>
        Delete
      </button>
    </li>
  `;
}
