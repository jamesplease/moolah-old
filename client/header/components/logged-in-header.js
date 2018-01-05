import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import classNames from 'classnames';
import Nav from './nav';
import ProfileDropdown from './profile-dropdown';
import preventScroll from '../../common/utils/prevent-scroll';

export class LoggedInHeader extends Component {
  render() {
    const {displayName} = this.props;
    const {isProfileDropdownVisible} = this.state;

    const accountLinkClass = classNames({
      'appHeader-accountLink': true,
      'appHeader-accountLink-active': isProfileDropdownVisible
    });

    return (
      <header className="appHeader">
        <div className="container padded-container appHeader-container">
          <h1 className="appHeader-appLogo">
            <Link to="/" className="appHeader-appLogo-Link">
              Moolah
            </Link>
          </h1>
          <Nav toggleOverlayNav={() => this.toggleOverlayNav(false)}/>
          <div className="appHeader-accountContainer">
            <div
              className={accountLinkClass}
              onClick={this.showProfileDropdown}>
              <span className="appHeader-userName">
                {displayName}
              </span>
              <i className="zmdi zmdi-caret-down"/>
            </div>
            <ProfileDropdown
              closeDropdown={this.hideProfileDropdown}
              isOpen={isProfileDropdownVisible}/>
          </div>
        </div>
      </header>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      isOverlayNavVisible: false,
      isProfileDropdownVisible: false
    };
  }

  toggleOverlayNav = (showOverlayNav) => {
    let newValue;
    if (typeof showOverlayNav === 'undefined') {
      newValue = !this.state.isOverlayNavVisible;
    } else {
      newValue = showOverlayNav;
    }

    if (newValue) {
      preventScroll.on();
    } else {
      preventScroll.off();
    }

    this.setState({
      isOverlayNavVisible: newValue
    });
  }

  showProfileDropdown = () => {
    this.setState({
      isProfileDropdownVisible: true
    });

    preventScroll.on();
  }

  hideProfileDropdown = () => {
    this.setState({
      isProfileDropdownVisible: false
    });

    preventScroll.off();
  }
}

function mapStateToProps(state) {
  return {
    displayName: _.get(state.auth, 'user.name')
  };
}

export default connect(mapStateToProps, null, null, {pure: false})(LoggedInHeader);
