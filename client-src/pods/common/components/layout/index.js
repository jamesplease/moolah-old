import yo from 'yo-yo';

import Header from '../header';
import Footer from '../footer';
import Transactions from '../../../home/components/transactions';

export default function(transactionsList = []) {
  const header = new Header();
  const footer = new Footer();

  const transactions = new Transactions(transactionsList);

  return yo`
    <div>
      ${header}
      <main>
        <div className="container">
          ${transactions}
        </div>
      </main>
      ${footer}
    </div>
  `;
}
