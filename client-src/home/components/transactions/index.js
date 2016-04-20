import yo from 'yo-yo';
import store from '../../../redux/store';
import {createTransaction} from '../../../redux/transactions/action-creators';
import Transaction from '../transaction';

function getTransactionsList(transactions) {
  return transactions.map(Transaction);
}

function getEmptyTransactions() {
  return yo`<div>Ain't nothin'</div>`;
}

function onClickNew() {
  store.dispatch(createTransaction({
    value: Math.random(),
    description: 'Hot off the press',
    date: '2015-10-02'
  }));
}

export default function() {
  var children;

  const transactions = store.getState().transactions.transactions || [];
  if (transactions.length) {
    children = getTransactionsList(transactions);
  } else {
    children = getEmptyTransactions();
  }

  return yo`
    <div className="transactions">
      <div class="transactions-header">
        <button className="create-transaction" onclick=${onClickNew}>+ New Transaction</button>
      </div>
      <ul>
        ${children}
      </ul>
    </div>
  `;
}
