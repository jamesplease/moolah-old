import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Nav from '../nav';
import * as uiActionCreators from '../../../redux/ui/action-creators';

export function Header({isMobileMenuVisible, uiActions}) {
  function onClickToggle() {
    uiActions.toggleMobileMenu(!isMobileMenuVisible);
  }

  return (
    <header>
      <div className="container">
        <h1 className="app-logo">
          <Link to="/">
            Moolah
          </Link>
        </h1>
        <button className="mobile-menu-toggle" onClick={onClickToggle}>
          <i className="zmdi zmdi-menu zmdi-hc-lg mobile-menu-toggle"></i>
        </button>
        <Nav/>
        <div className="header-profile-container">
          <Link className="header-profile-link" to="/profile">
            <span className="header-name">
              James S.
            </span>
            <img className="header-profile-pic" />
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
