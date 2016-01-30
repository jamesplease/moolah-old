import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Router, Route, IndexRoute} from 'react-router';

import Layout from './components/layout';
import HomePage from './components/home-page';
import NotFound from './components/not-found';

const routes = (
  <Router history={createBrowserHistory()}>
    <Route path='/' component={Layout}>
      <IndexRoute component={HomePage} />
      <Route path='*' component={NotFound}/>
    </Route>
  </Router>
);

ReactDOM.render(
  routes,
  document.querySelector('.app-container')
);
