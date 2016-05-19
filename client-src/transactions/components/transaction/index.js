import React from 'react';
import serialize from 'form-serialize';

export default function Transaction(props) {
  const {transaction, deleteTransaction, updateTransaction} = props;

  function deleteSelf() {
    deleteTransaction(transaction.id);
  }

  const formId = `transaction-form-${transaction.id}`;

  function updateSelf() {
    let form = document.getElementById(formId);
    let formData = serialize(form, {hash: true});
    updateTransaction(transaction.id, formData);
  }

  return (
    <li className="transaction">
      <form id={formId} className="transaction-form">
        <input className="transaction-date" value={transaction.date} name="date"/>
        <input className="transaction-description" value={transaction.description} name="description"/>
        <input className="transaction-value" value={transaction.value} name="value"/>
      </form>
      <button className="save-transaction" onClick={updateSelf}>
        Save
      </button>
      <button className="delete-transaction" onClick={deleteSelf}>
        Delete
      </button>
    </li>
  );
}
