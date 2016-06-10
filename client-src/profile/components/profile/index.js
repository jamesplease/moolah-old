import React from 'react';
import loginServices from '../../../common/services/login-services';

const imgSrc = 'http://lh3.googleusercontent.com' +
  '/-SFoxuA-9BgQ/AAAAAAAAAAI/AAAAAAAAAAA/ADhl2yoCgd6de7jfz57PsSkdK0WUHJH1IQ/s64-c-mo/photo.jpg';

function getLoginServiceImgUrl(serviceName) {
  return `/${serviceName.toLowerCase()}-logo@2x.png`;
}

export default function Profile() {
  return (
    <div className="container">
      <div className="profile">
        <div className="profile-form-row">
          <label className="profile-label">Profile Photo</label>
          <div className="photo-input">
            <img
              className="profile-photo"
              src={imgSrc}/>
            <button className="link-text change-photo-text">Change photo</button>
          </div>
        </div>
        <div className="profile-form-row">
          <label className="profile-label">Name</label>
          <input type="text" className="text-input" value="Aradhya Singhal"/>
        </div>
        <div className="profile-form-row">
          <label className="profile-label">Email</label>
          <input type="text" className="text-input" value="asinghal@gmail.com"/>
        </div>
        <div className="resource-list-header">
          <div className="resource-list-header-text">
            Logins
          </div>
        </div>
        <ul className="resource-list">
          {loginServices.map(service => (
            <li className="resource-list-item" key={service.name}>
              <img
                className="resource-list-profile-icon"
                src={getLoginServiceImgUrl(service.name)}/>
              {service.name}
              <button className="resource-list-item-delete">
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
