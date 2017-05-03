import React from 'react';
import isLoggedIn from '../utils/is-logged-in';
import LoggedInHeader from './logged-in-header';
import LandingPageHeader from './landing-page-header';

export default function Header({user}) {
  const loggedIn = isLoggedIn(user);

  if (loggedIn) {
    return <LoggedInHeader/>;
  } else {
    return <LandingPageHeader/>;
  }
}
