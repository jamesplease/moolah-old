import yo from 'yo-yo';

import Header from '../header';
import Footer from '../footer';
import Alert from '../alert';
import MobileNav from '../mobile-nav';

export default function({ header, content }) {
  const footer = new Footer();
  const alert = new Alert();

  return yo`
    <div id="root">
      ${new Header()}
      ${MobileNav()}
      ${alert}
      <div className="content-container">
        ${header ? header() : null}
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
