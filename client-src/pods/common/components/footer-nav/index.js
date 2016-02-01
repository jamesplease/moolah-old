import React from 'react';
import {Link} from 'react-router';

const FooterNav = () => (
  <ul className="footer-nav">
    <li>
      <Link to="/terms">Terms</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
  </ul>
);

export default FooterNav;
