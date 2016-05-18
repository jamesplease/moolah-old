import 'babel-polyfill';
import yo from 'yo-yo';
import sheetRouter from 'sheet-router';
import history from 'sheet-router/history';
import href from 'sheet-router/href';

import layout from './common/components/layout';
import dashboardSubheader from './dashboard/components/subheader';
import dashboard from './dashboard/components/dashboard';
import categoriesSubheader from './categories/components/subheader';
import categories from './categories/components/content';
import profileSubheader from './profile/components/subheader';
import profile from './profile/components/profile';
import analyticsSubheader from './analytics/components/subheader';
import analytics from './analytics/components/analytics';
import transactionsSubheader from './transactions/components/subheader';
import transactions from './transactions/components/transactions';
import connectivityService from './common/services/connectivity-service';
import terms from './meta/components/terms';
import store from './redux/store';
import * as transactionsActions from './redux/transactions/action-creators';
import * as historyActions from './redux/history/action-creators';

const router = sheetRouter((r) => {
  return [
    r('/', () => layout({
      header: dashboardSubheader,
      content: dashboard
    })),
    r('/transactions', () => layout({
      header: transactionsSubheader,
      content: transactions
    })),
    r('/categories', () => layout({
      header: categoriesSubheader,
      content: categories
    })),
    r('/analytics', () => layout({
      header: analyticsSubheader,
      content: analytics
    })),
    r('/profile', () => layout({
      header: profileSubheader,
      content: profile
    })),
    r('/terms', () => layout({
      content: terms
    }))
  ];
});

const appContainer = document.querySelector('.app-container');

appContainer.appendChild(router(document.location.href));

href(href => store.dispatch(historyActions.navigate(href)));
history(href => store.dispatch(historyActions.navigate(href)));

store.subscribe(() => {
  const state = store.getState();
  const location = state.history.location;
  const el = document.querySelector('#root');
  yo.update(el, router(location));
});

// Check for offline activites
connectivityService.registerListener();
// Load our initial route into the state
store.dispatch(historyActions.navigate(document.location.href));

// Fetch our initial data
store.dispatch(transactionsActions.retrieveTransactions());
