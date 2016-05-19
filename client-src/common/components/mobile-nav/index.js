import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Nav from '../nav';

export function MobileNav({isMobileMenuVisible}) {
  const mobileNavClass = classNames({
    'mobile-nav': true,
    visible: isMobileMenuVisible
  });

  return (
    <div className={mobileNavClass}>
      <Nav/>
    </div>
  );
}

function mapStateToProps(state) {
  return {isMobileMenuVisible: state.ui.isMobileMenuVisible};
}

export default connect(mapStateToProps)(MobileNav);
