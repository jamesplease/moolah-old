import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {
  Router, Route, IndexRoute, browserHistory,
  Redirect, applyRouterMiddleware
} from 'react-router';
import {useScroll} from 'react-router-scroll';
import IndexPage from './common/components/index-page';
import Categories from './categories/components/content';
import Account from './account/components/account';
import Transactions from './transactions/components/content';
import Layout from './common/components/layout';
import NotFound from './common/components/not-found';
import About from './meta/components/about';
import Contact from './meta/components/contact';
import Privacy from './meta/components/privacy';
import Terms from './meta/components/terms';
import SignIn from './meta/components/sign-in';
import store from './redux/store';
import generateAuthCheck from './common/services/auth-check';
import {getYearMonthStringFromDate} from './transactions/services/format-date';

if (process.NODE_ENV !== 'production') {
  window.store = store;
}

const authCheck = generateAuthCheck(store);

// When we enter `/transactions/this-month`, we dynamically redirect them to a
// URL with the current month and year in it. This way, the URL in the nav bar
// can remain constant, even if the user keeps the app open as the dates change.
function onTransactionsEnter(nextState, redirect) {
  if (!authCheck.mustBeLoggedIn()) {
    return;
  }

  const dateString = getYearMonthStringFromDate(new Date());
  redirect(`/transactions/${dateString}`);
}

render((
  <Provider store={store}>
    <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
      <Route path="/" component={Layout}>
        <IndexRoute component={IndexPage}/>
        <Route path="/transactions" onEnter={onTransactionsEnter}/>
        <Route
          path="/transactions/:transactionDate"
          component={Transactions}
          onEnter={authCheck.mustBeLoggedIn}/>
        <Route path="/categories" component={Categories} onEnter={authCheck.mustBeLoggedIn}/>
        <Route path="/account" component={Account} onEnter={authCheck.mustBeLoggedIn}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/privacy" component={Privacy}/>
        <Route path="/about" component={About}/>
        <Route path="/terms" component={Terms}/>
        <Route path="/login" component={SignIn} onEnter={authCheck.mustBeLoggedOut}/>
        <Route path="/join" component={SignIn} onEnter={authCheck.mustBeLoggedOut}/>
        <Redirect from="/dashboard" to="/"/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>
), document.querySelector('.app-container'));
