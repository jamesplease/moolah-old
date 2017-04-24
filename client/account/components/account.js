import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Subheader from './subheader';
import * as authActionCreators from '../../state/auth/action-creators';

function getLoginServiceImgUrl(serviceName) {
  return `/${serviceName.toLowerCase()}-logo@2x.png`;
}

export class Account extends Component {
  render() {
    const {user} = this.props;
    const {name, email, logins} = user;

    const linkedServices = _.chain(logins)
      .map((isLinked, serviceName) => ({isLinked, serviceName}))
      .filter(service => service.isLinked)
      .value();

    return (
      <div>
        <Subheader/>
        <div className="account container container-bottomSpaced">
          <div className="account-form-row">
            <label className="account-label">Profile Photo</label>
            <div className="photo-input">
              <img
                className="account-photo"/>
              <button className="link-text change-photo-text">Change photo</button>
            </div>
          </div>
          <div className="account-form-row">
            <label className="account-label">Name</label>
            <input type="text" className="text-input" value={name}/>
          </div>
          <div className="account-form-row">
            <label className="account-label">Email</label>
            <input type="text" className="text-input" value={email}/>
          </div>
          <div className="resource-list-header">
            <div className="resource-list-header-text">
              Logins
            </div>
          </div>
          <ul className="resource-list">
            {linkedServices.map((service) => (
              <li className="resourceListItem" key={service.serviceName}>
                <img
                  className="resource-list-account-icon"
                  src={getLoginServiceImgUrl(service.serviceName.toLowerCase())}/>
                {_.capitalize(service.serviceName)}
                <button
                  className="resourceListItem-deleteBtn"
                  onClick={() => this.logout(service.serviceName.toLowerCase())}
                  disabled={linkedServices.length === 1}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  logout = (serviceName) => {
    const {unlinkAccount} = this.props;
    const lowerCaseServiceName = serviceName.toLowerCase();
    unlinkAccount(lowerCaseServiceName);
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(authActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
