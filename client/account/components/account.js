import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Subheader from './subheader';
import LoadingIndicator from '../../common/components/loading-indicator';
import * as authActionCreators from '../../state/auth/action-creators';

function getLoginServiceImgUrl(serviceName) {
  return `/${serviceName.toLowerCase()}-logo@2x.png`;
}

export class Account extends Component {
  render() {
    const {user, userMeta} = this.props;
    const {logins} = user;

    const linkedServices = _.chain(logins)
      .map((isLinked, serviceName) => ({isLinked, serviceName}))
      .filter(service => service.isLinked)
      .value();

    const isSavingName = _.get(userMeta.updatingAttributes, 'name');
    const isSavingEmail = _.get(userMeta.updatingAttributes, 'email');

    return (
      <div>
        <Subheader/>
        <div className="account container container-bottomSpaced">
          <div className="account-form-row">
            <label className="account-label">Name</label>
            <div className="account-field-container">
              <input
                type="text"
                autoCapitalize="words"
                autoComplete="name"
                spellCheck={false}
                className="text-input account_textInput"
                value={this.state.name}
                onChange={(e) => this.setState({name: e.target.value})}
                onBlur={(e) => this.onBlurInput('name', e.target.value)}
                disabled={isSavingName}/>
              <div className="account_loadingIndicatorContainer">
                {isSavingName && (
                  <LoadingIndicator className="account_loadingIndicator"/>
                )}
              </div>
            </div>
          </div>
          <div className="account-form-row">
            <label className="account-label">Email</label>
            <div className="account-field-container">
              <input
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                spellCheck={false}
                className="text-input account_textInput"
                value={this.state.email}
                onChange={(e) => this.setState({email: e.target.value})}
                onBlur={(e) => this.onBlurInput('email', e.target.value)}
                disabled={isSavingEmail}/>
              <div className="account_loadingIndicatorContainer">
                {isSavingEmail && (
                  <LoadingIndicator className="account_loadingIndicator"/>
                )}
              </div>
            </div>
          </div>
          <div className="resource-list-header">
            <div className="resource-list-header-text">
              Logins
            </div>
          </div>
          <ul className="resourceList">
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

  constructor(props) {
    super(props);
    const {user} = props;

    this.state = {
      email: user.email,
      name: user.name
    };
  }

  onBlurInput = (field, newValue) => {
    const {updateProfile, user} = this.props;

    // If the user hasn't entered anything, we do nothing
    if (!newValue) {
      return;
    }

    // If the user hasn't changed the value, then we do not need to save
    if (user[field] === newValue) {
      return;
    }

    updateProfile({
      id: user.id,
      attributes: {
        [field]: newValue
      }
    });
  }

  logout = (serviceName) => {
    const {unlinkAccount} = this.props;
    const lowerCaseServiceName = serviceName.toLowerCase();
    unlinkAccount(lowerCaseServiceName);
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user || {},
    userMeta: state.auth.userMeta || {}
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(authActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
