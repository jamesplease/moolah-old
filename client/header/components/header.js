import React from 'react';
import LoggedInHeader from './logged-in-header';
import LandingPageHeader from './landing-page-header';
import isLoggedIn from '../../common/utils/is-logged-in';

export default function Header({user}) {
  const loggedIn = isLoggedIn(user);

  if (loggedIn) {
    return <LoggedInHeader/>;
  } else {
    return <LandingPageHeader/>;
  }
}
