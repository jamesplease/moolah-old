import yo from 'yo-yo';

export default function() {
  return yo`
    <footer>
    <div className="footer-copyright">
      Copyright © Moolah 2016. All rights reserved.
    </div>
    <nav className="footer-nav">
      <ul>
        <li>
          <a href="/terms">
            Terms
          </a>
        </li>
        <li>
          <a href="/privacy">
            Privacy
          </a>
        </li>
        <li>
          <a href="/about">
            About
          </a>
        </li>
        <li>
          <a href="/contact">
            Contact
          </a>
        </li>
      </ul>
    </nav>
    </footer>
  `;
}
