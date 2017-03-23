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
          <Link to="/login" className="btn btn-secondary landingPageHeader-btn">
            Log In
          </Link>
        </div>
      </div>
    </header>
  );
}
