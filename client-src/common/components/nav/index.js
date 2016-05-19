import React from 'react';
// import {Link} from 'react-router';
import * as uiActionCreators from '../../../redux/ui/action-creators';

function onClickNavItem() {
  console.log('ok');
}

export default function Nav() {
  return (
    <nav className="main-nav">
      <ul className="main-nav-list">
        <li>
          <a href="/transactions" onClick={onClickNavItem}>
            Transactions
          </a>
        </li>
        <li>
          <a href="/categories" onClick={onClickNavItem}>
            Categories
          </a>
        </li>
        <li>
          <a href="/analytics" onClick={onClickNavItem}>
            Analytics
          </a>
        </li>
      </ul>
    </nav>
  );
}
