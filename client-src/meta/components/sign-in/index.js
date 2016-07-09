import React from 'react';
import loginServices from '../../../common/services/login-services';

function generateServiceLink(serviceName) {
  return serviceName.toLowerCase();
}

function getLoginServiceImgUrl(serviceName) {
  return `/${serviceName.toLowerCase()}-logo@2x.png`;
}

export default function SignIn() {
  return (
    <div className="signIn container padded-container">
      <div className="signIn-text">
        Sign in or create an account with:
      </div>
      <ul className="signIn-serviceList">
        {loginServices.map(service => (
          <li key={service.name}>
            <a
              href={`/login/${generateServiceLink(service.name)}`}
              className="signIn-serviceBtn">
              <img
                src={getLoginServiceImgUrl(service.name)}
                className="signIn-serviceLogo"/>
              {service.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
