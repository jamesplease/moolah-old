import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory, Redirect} from 'react-router';

import DashboardSubheader from './dashboard/components/subheader';
import Dashboard from './dashboard/components/dashboard';
import CategoriesSubheader from './categories/components/subheader';
import Categories from './categories/components/content';
import ProfileSubheader from './profile/components/subheader';
import Profile from './profile/components/profile';
import AnalyticsSubheader from './analytics/components/subheader';
import Analytics from './analytics/components/analytics';
import TransactionsSubheader from './transactions/components/subheader';
import Transactions from './transactions/components/transactions';
import Layout from './common/components/layout';
import About from './meta/components/about';
import Contact from './meta/components/contact';
import Privacy from './meta/components/privacy';
import Terms from './meta/components/terms';
import store from './redux/store';

const App = React.createClass({
  render() {
    return <div>Not Found Sorry</div>;
  }
});

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute components={{main: Dashboard, subheader: DashboardSubheader}}/>
        <Route path="/transactions" components={{main: Transactions, subheader: TransactionsSubheader}}/>
        <Route path="/categories" components={{main: Categories, subheader: CategoriesSubheader}}/>
        <Route path="/analytics" components={{main: Analytics, subheader: AnalyticsSubheader}}/>
        <Route path="/profile" components={{main: Profile, subheader: ProfileSubheader}}/>
        <Route path="/contact" components={{main: Contact}}/>
        <Route path="/privacy" components={{main: Privacy}}/>
        <Route path="/about" components={{main: About}}/>
        <Route path="/terms" components={{main: Terms}}/>
        <Redirect from="/dashboard" to="/"/>
        <Route path="*" components={{main: App}}/>
      </Route>
    </Router>
  </Provider>
), document.querySelector('.app-container'));
