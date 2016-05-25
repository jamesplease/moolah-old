import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as uiActionCreators from '../../../redux/ui/action-creators';

export function Nav({uiActions, isMobileNav, isHidden}) {
  // This ensures that the mobile nav gets closed anytime a link is clicked
  function onClickNavItem() {
    if (!isMobileNav) { return; }
    uiActions.toggleMobileMenu(false);
  }

  // If the nav is hidden, then it cannot be tabbed to
  const itemTabIndex = isHidden ? -1 : 0;

  let dashboardLink;
  if (isMobileNav) {
    dashboardLink = (
      <li>
        <Link
          to="/"
          onClick={onClickNavItem}
          activeClassName="active"
          tabIndex={itemTabIndex}>
          Dashboard
        </Link>
      </li>
    );
  }

  return (
    <nav className="main-nav">
      <ul className="main-nav-list">
        {dashboardLink}
        <li>
          <Link
            to="/transactions"
            onClick={onClickNavItem}
            activeClassName="active"
            tabIndex={itemTabIndex}>
            Transactions
          </Link>
        </li>
        <li>
          <Link
            to="/categories"
            onClick={onClickNavItem}
            activeClassName="active"
            tabIndex={itemTabIndex}>
            Categories
          </Link>
        </li>
        <li>
          <Link
            to="/analytics"
            onClick={onClickNavItem}
            activeClassName="active"
            tabIndex={itemTabIndex}>
            Analytics
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    uiActions: bindActionCreators(uiActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps, null, {pure: false})(Nav);
