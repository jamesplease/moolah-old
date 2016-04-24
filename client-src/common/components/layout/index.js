import yo from 'yo-yo';

import Header from '../header';
import Footer from '../footer';
import Alert from '../alert';
import Transactions from '../../../transactions/components/transactions';

export default function(content) {
  const header = new Header();
  const footer = new Footer();
  const alert = new Alert();

  return yo`
    <div id="root">
      ${header}
      ${alert}
      <main>
        <div className="container">
          ${content}
        </div>
      </main>
      ${footer}
    </div>
  `;
}
