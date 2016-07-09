import React from 'react';
import LoggedInHeader from '../logged-in-header';
import LandingPageHeader from '../landing-page-header';

export default function Header({user}) {
  const isLoggedIn = Boolean(user);

  if (isLoggedIn) {
    return <LoggedInHeader/>;
  } else {
    return <LandingPageHeader/>;
  }
}
