import yo from 'yo-yo';

import Header from '../header';
import Footer from '../footer';
import Alert from '../alert';

export default function({ header, content }) {
  const footer = new Footer();
  const alert = new Alert();

  return yo`
    <div id="root">
      ${Header()}
      ${header()}
      ${alert}
      <div className="content-container">
        <main>
          <div className="container">
            ${content()}
          </div>
        </main>
        ${footer}
      </div>
    </div>
  `;
}
