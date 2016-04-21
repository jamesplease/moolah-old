import yo from 'yo-yo';

import Header from '../header';
import Footer from '../footer';
import Alert from '../alert';
import Transactions from '../../../home/components/transactions';

export default function(transactionsList = []) {
  const header = new Header();
  const footer = new Footer();
  const alert = new Alert();

  const transactions = new Transactions(transactionsList);

  return yo`
    <div>
      ${header}
      ${alert}
      <main>
        <div className="container">
          ${transactions}
        </div>
      </main>
      ${footer}
    </div>
  `;
}
