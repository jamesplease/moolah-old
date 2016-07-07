import React from 'react';
import {Link} from 'react-router';

export default function LandingPageHeader() {
  return (
    <header className="appHeader">
      <div className="container padded-container appHeader-container">
        <h1>
          <Link to="/" className="appHeader-appLogo-Link">
            Moolah
          </Link>
        </h1>
        <div className="landingPageHeader-buttonContainer">
          <Link to="/login" className="btn btn-line landingPageHeader-btn">
            Log In
          </Link>
          <Link to="/join" className="btn landingPageHeader-btn">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
