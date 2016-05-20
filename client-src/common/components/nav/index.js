import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as uiActionCreators from '../../../redux/ui/action-creators';

export function Nav({uiActions, isMobileNav}) {
  // This ensures that the mobile nav gets closed anytime a link is clicked
  function onClickNavItem() {
    if (!isMobileNav) { return; }
    uiActions.toggleMobileMenu(false);
  }

  let dashboardLink;
  if (isMobileNav) {
    dashboardLink = (
      <li>
        <Link to="/" onClick={onClickNavItem} activeClassName="active">
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
          <Link to="/transactions" onClick={onClickNavItem} activeClassName="active">
            Transactions
          </Link>
        </li>
        <li>
          <Link to="/categories" onClick={onClickNavItem} activeClassName="active">
            Categories
          </Link>
        </li>
        <li>
          <Link to="/analytics" onClick={onClickNavItem} activeClassName="active">
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
