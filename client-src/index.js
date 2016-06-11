import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {
  Router, Route, IndexRoute, browserHistory,
  Redirect, applyRouterMiddleware
} from 'react-router';
import useScroll from 'react-router-scroll';
import Dashboard from './dashboard/components/dashboard';
import Categories from './categories/components/content';
import Account from './account/components/account';
import Analytics from './analytics/components/analytics';
import Transactions from './transactions/components/transactions';
import Layout from './common/components/layout';
import About from './meta/components/about';
import Contact from './meta/components/contact';
import Privacy from './meta/components/privacy';
import Terms from './meta/components/terms';
import store from './redux/store';

import './common/services/js-emoji';

const NotFound = React.createClass({
  render() {
    return (<div>Not found – sorry!</div>);
  }
});

render((
  <Provider store={store}>
    <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Dashboard}/>
        <Route path="/transactions" component={Transactions}/>
        <Route path="/categories" component={Categories}/>
        <Route path="/analytics" component={Analytics}/>
        <Route path="/account" component={Account}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/privacy" component={Privacy}/>
        <Route path="/about" component={About}/>
        <Route path="/terms" component={Terms}/>
        <Redirect from="/dashboard" to="/"/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>
), document.querySelector('.app-container'));
