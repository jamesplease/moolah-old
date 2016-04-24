import yo from 'yo-yo';

import Footer from '../footer';
import Alert from '../alert';

export default function({ header, content }) {
  const footer = new Footer();
  const alert = new Alert();

  return yo`
    <div id="root">
      ${header()}
      ${alert}
      <main>
        <div className="container">
          ${content()}
        </div>
      </main>
      ${footer}
    </div>
  `;
}
