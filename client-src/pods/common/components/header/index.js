import React from 'react';
import {IndexLink} from 'react-router';

const Header = () => (
  <header>
    <div className="container">
      <h1>
        <IndexLink to="/">Finance App</IndexLink>
      </h1>
    </div>
  </header>
);

export default Header;
