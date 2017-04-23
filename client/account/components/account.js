import React from 'react';
import {connect} from 'react-redux';
import Subheader from './subheader';
import loginServices from '../../common/services/login-services';

const imgSrc = 'http://lh3.googleusercontent.com' +
  '/-SFoxuA-9BgQ/AAAAAAAAAAI/AAAAAAAAAAA/ADhl2yoCgd6de7jfz57PsSkdK0WUHJH1IQ/s64-c-mo/photo.jpg';

function getLoginServiceImgUrl(serviceName) {
  return `/${serviceName.toLowerCase()}-logo@2x.png`;
}

export function Account({user}) {
  const {name, email} = user;
  return (
    <div>
      <Subheader/>
      <div className="account container container-bottomSpaced">
        <div className="account-form-row">
          <label className="account-label">Profile Photo</label>
          <div className="photo-input">
            <img
              className="account-photo"
              src={imgSrc}/>
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
          {loginServices.map(service => (
            <li className="resourceListItem" key={service.name}>
              <img
                className="resource-list-account-icon"
                src={getLoginServiceImgUrl(service.name)}/>
              {service.name}
              <button className="resourceListItem-deleteBtn">
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(Account);
