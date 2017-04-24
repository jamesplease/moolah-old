import React from 'react';
import {connect} from 'react-redux';
import isLoggedIn from '../services/is-logged-in';
import Dashboard from '../../dashboard/components/dashboard';
import LandingPage from '../../meta/components/landing-page';

export function IndexPage({user}) {
  const loggedIn = isLoggedIn(user);

  if (loggedIn) {
    return <Dashboard/>;
  } else {
    return <LandingPage/>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(IndexPage);
