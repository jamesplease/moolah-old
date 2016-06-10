import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import classNames from 'classnames';
import Nav from '../nav';
import * as uiActionCreators from '../../../redux/ui/action-creators';

export function Header({isMobileMenuVisible, uiActions}) {
  function onClickToggle() {
    uiActions.toggleMobileMenu(!isMobileMenuVisible);
  }

  const mobileNavToggleClass = classNames({
    'is-active': isMobileMenuVisible,
    'mobile-menu-toggle hamburger hamburger--squeeze': true
  });

  return (
    <header>
      <div className="container">
        <h1 className="app-logo">
          <Link to="/">
            Moolah
          </Link>
        </h1>
        <button
          className={mobileNavToggleClass}
          onClick={onClickToggle}>
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
        <Nav/>
        <div className="header-account-container">
          <Link className="header-account-link" to="/account">
            <span className="header-name">
              James S.
            </span>
            <img className="header-account-pic"/>
          </Link>
        </div>
      </div>
    </header>
  );
}

function mapStateToProps(state) {
  return {isMobileMenuVisible: state.ui.isMobileMenuVisible};
}

function mapDispatchToProps(dispatch) {
  return {
    uiActions: bindActionCreators(uiActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Header);
