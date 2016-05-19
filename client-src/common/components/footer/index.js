import React from 'react';
import {Link} from 'react-router';

export default function Footer() {
  return (
    <footer>
      <div className="footer-copyright">
        Copyright © Moolah 2016. All rights reserved.
      </div>
      <nav className="footer-nav">
        <ul>
          <li>
            <Link to="/terms">
              Terms
            </Link>
          </li>
          <li>
            <Link to="/privacy">
              Privacy
            </Link>
          </li>
          <li>
            <Link to="/about">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
