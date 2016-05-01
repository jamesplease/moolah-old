// import 'babel-polyfill';
// import yo from 'yo-yo';
// import sheetRouter from 'sheet-router';
// import history from 'sheet-router/history';
// // import href from 'sheet-router/href';
//
// import layout from './common/components/layout';
// import profileHeader from './profile/components/header';
// import profile from './profile/components/profile';
// import analyticsHeader from './analytics/components/header';
// import analytics from './analytics/components/analytics';
// import transactionsHeader from './transactions/components/header';
// import transactions from './transactions/components/transactions';
// import connectivityService from './common/services/connectivity-service';
// import './common/services/google-auth';
// import store from './redux/store';
// import * as transactionsActions from './redux/transactions/action-creators';
// import * as historyActions from './redux/history/action-creators';
// import loadFromInitialState from './auth/util/load-from-initial-state';
// import ensureLoggedIn from './auth/util/ensure-logged-in';
// import linkIntercept from './routing/util/link-intercept';
//
// window.store = store;
//
// loadFromInitialState();
//
// function redirect(router, href) {
//   window.history.pushState({}, null, href);
//   return router(href);
// }
//
// const router = sheetRouter('/404', (r) => {
//   return [
//     r('/', ensureLoggedIn(
//       () => redirect(router, '/login'),
//       () => layout({
//         header: () => yo`Home header`,
//         content: () => yo`Welcome home!`
//       }))
//     ),
//     r('/transactions', ensureLoggedIn(
//       () => redirect(router, '/login'),
//       () => layout({
//         header: transactionsHeader,
//         content: transactions
//       }))
//     ),
//     r('/analytics', ensureLoggedIn(
//       () => redirect(router, '/login'),
//       () => layout({
//         header: analyticsHeader,
//         content: analytics
//       }))
//     ),
//     r('/profile', ensureLoggedIn(
//         () => redirect(router, '/login'),
//         () => layout({
//         header: profileHeader,
//         content: profile
//       }))
//     ),
//     r('/login', () => layout({
//       header: () => yo`login time`,
//       content: () => yo`<a className="sign-in" href="/login/google" data-bypass>Sign in With Google</a>`
//     })),
//     r('/404', () => layout({
//       header: () => yo`404 :(`,
//       content: () => yo`Woops – this page doesn't exist`
//     })),
//   ];
// });
//
// const appContainer = document.querySelector('.app-container');
//
// appContainer.appendChild(router(document.location.href));
//
// linkIntercept(href => store.dispatch(historyActions.navigate(href)));
// history(href => store.dispatch(historyActions.navigate(href)));
//
// store.subscribe(() => {
//   const state = store.getState();
//   const location = state.history.location;
//   const el = document.querySelector('#root');
//   yo.update(el, router(location));
// });
//
// // Check for offline activites
// connectivityService.registerListener();
// // Load our initial route into the state
// store.dispatch(historyActions.navigate(document.location.href));
//
// // Fetch our initial data
// store.dispatch(transactionsActions.retrieveTransactions());

var initial = document.querySelector('#initial-data');
var data = JSON.parse(initial.text);
console.log('logged in:', Boolean(data.user));

var link = document.createElement('a');
link.href = '/login/google';
link.innerHTML = 'Log in with Google';
document.body.appendChild(link);
