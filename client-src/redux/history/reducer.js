import actionTypes from './action-types';
import initialState from './initial-state';

const routeMap = {
  '/': 'home',
  '/transactions': 'transactions',
  '/categories': 'categories',
  '/analytics': 'analytics',
  '/profile': 'profile'
};

function pathnameFromLocation(href) {
  var linkEl = document.createElement('a');
  linkEl.href = href;
  return linkEl.pathname;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NAVIGATE: {
      const pathname = pathnameFromLocation(action.location);
      const routeName = routeMap[pathname];
      return {
        ...state,
        routeName,
        location: action.location
      };
    }
    default: {
      return state;
    }
  }
};
