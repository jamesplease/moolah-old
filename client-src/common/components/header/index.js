import yo from 'yo-yo';
import store from '../../../redux/store';
import {createTransaction} from '../../../redux/transactions/action-creators';

function onClickNew() {
  store.dispatch(createTransaction({
    value: Math.random(),
    description: 'Hot off the press',
    date: '2015-10-02'
  }));
}

export default function() {
  return yo`
    <header className="app-header">
      <div className="container">
        <button className="create-new-transaction" onclick=${onClickNew}>
          + New Transaction
        </button>
      </div>
    </header>
  `;
}
