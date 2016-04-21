import 'babel-polyfill';
import yo from 'yo-yo';

import Layout from './common/components/layout';
import connectivityService from './common/services/connectivity-service';
import store from './redux/store';
import * as actions from './redux/transactions/action-creators';

const layout = Layout();

const appContainer = document.querySelector('.app-container');
appContainer.appendChild(layout);

connectivityService.registerListener();

function updateApp() {
  const newLayout = Layout();
  yo.update(layout, newLayout);
}

// Ensure that the DOM is re-rendered with each potential state change
store.subscribe(updateApp);

// Fetch our initial data
store.dispatch(actions.retrieveTransactions());
