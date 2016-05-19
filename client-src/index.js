import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import DashboardSubheader from './dashboard/components/subheader';
import Dashboard from './dashboard/components/dashboard';
import CategoriesSubheader from './categories/components/subheader';
import Categories from './categories/components/content';
import ProfileSubheader from './profile/components/subheader';
import Profile from './profile/components/profile';
import AnalyticsSubheader from './analytics/components/subheader';
import Analytics from './analytics/components/analytics';
// import TransactionsSubheader from './transactions/components/subheader';
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
        <IndexRoute component={Dashboard}/>
        <Route path="/transactions" component={Transactions}/>
        <Route path="/categories" component={Categories}/>
        <Route path="/analytics" component={Analytics}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/privacy" component={Privacy}/>
        <Route path="/about" component={About}/>
        <Route path="/terms" component={Terms}/>
        <Route path="*" component={App}/>
      </Route>
    </Router>
  </Provider>
), document.querySelector('.app-container'));
