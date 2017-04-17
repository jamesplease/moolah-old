import React from 'react';
import {Link} from 'react-router';

export default function LandingPage() {
  return (
    <div className="landingPage_heroTextContainer">
      <div className="landingPage-heroText">
        Personal finance has never
        <br/>
        been this easy.
      </div>
      <Link to="/join" className="btn btn-promotion">
        Sign up for free
      </Link>
    </div>
  );
}
