import 'babel-polyfill';
import yo from 'yo-yo';
import sheetRouter from 'sheet-router';
import history from 'sheet-router/history';
import href from 'sheet-router/href';

import layout from './common/components/layout';
import profile from './profile/components/profile';
import analytics from './analytics/components/analytics';
import transactions from './transactions/components/transactions';
import connectivityService from './common/services/connectivity-service';
import store from './redux/store';
import * as transactionsActions from './redux/transactions/action-creators';
import * as historyActions from './redux/history/action-creators';

const router = sheetRouter((r) => {
  return [
    r('/', () => layout(yo`Welcome home!`)),
    r('/transactions', () => layout(transactions())),
    r('/analytics', () => layout(analytics())),
    r('/profile', () => layout(profile()))
  ];
});

const appContainer = document.querySelector('.app-container');

appContainer.appendChild(router(document.location.pathname));

href(href => store.dispatch(historyActions.navigate(href)));
history(href => store.dispatch(historyActions.navigate(href)));

store.subscribe(() => {
  const state = store.getState();
  const location = state.history.location;
  const el = document.querySelector('#root');
  yo.update(el, router(location, {}));
});

// Check for offline activites
connectivityService.registerListener();
// Load our initial route into the state
store.dispatch(historyActions.navigate(document.location.pathname));

// Fetch our initial data
store.dispatch(transactionsActions.retrieveTransactions());
