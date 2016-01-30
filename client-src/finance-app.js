import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import Layout from './components/layout';
import HomePage from './components/home-page';

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={HomePage} />
    </Route>
  </Router>
);

ReactDOM.render(
  routes,
  document.querySelector('body')
);
