import React from 'react';
import Nav from '../nav';
// import * as uiActionCreators from '../../../redux/ui/action-creators';

function toggleMobileNav() {
  console.log('toggling');
  // const isMobileMenuVisible = store.getState().ui.isMobileMenuVisible;
  // store.dispatch(uiActionCreators.toggleMobileMenu(!isMobileMenuVisible))
}

export default function Header() {
  return (
    <header>
      <h1 className="app-logo">
        <a href="/">
          Moolah
        </a>
      </h1>
      <button className="mobile-menu-toggle" onClick={toggleMobileNav}>
        <i className="zmdi zmdi-menu zmdi-hc-lg mobile-menu-toggle"></i>
      </button>
      <Nav/>
      <div className="header-profile-container">
        <a className="header-profile-link" href="/profile">
          <span className="header-name">
            James S.
          </span>
          <img className="header-profile-pic" />
        </a>
      </div>
    </header>
  );
}
