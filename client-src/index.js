import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Router, Route, IndexRoute} from 'react-router';

import Layout from './pods/common/components/layout';
import NotFound from './pods/common/components/not-found';
import HomePage from './pods/home/components/home-page';
import About from './pods/meta/components/about';
import Terms from './pods/meta/components/terms';

const routes = (
  <Router history={createBrowserHistory()}>
    <Route path='/' component={Layout}>
      <IndexRoute component={HomePage}/>
      <Route path='/about' component={About}/>
      <Route path='/terms' component={Terms}/>
      <Route path='*' component={NotFound}/>
    </Route>
  </Router>
);

ReactDOM.render(
  routes,
  document.querySelector('.app-container')
);
