import React from 'react';
import loginServices from '../../common/services/login-services';

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
              href={`/login/${service.name.toLowerCase()}`}
              className={`signIn-serviceBtn signIn_${service.name.toLowerCase()}Btn`}>
              <i className={`signIn-serviceLogo zmdi zmdi-${service.name.toLowerCase()}`}/>
              {service.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
