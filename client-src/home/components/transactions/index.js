import yo from 'yo-yo';
import store from '../../../redux/store';
import Transaction from '../transaction';

function getTransactionsList(transactions) {
  return transactions.map(Transaction);
}

function getEmptyTransactions() {
  return yo`<div>Ain't nothin'</div>`;
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
        <button className="create-transaction">+ New Transaction</button>
      </div>
      <ul>
        ${children}
      </ul>
    </div>
  `;
}
