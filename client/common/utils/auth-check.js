import isLoggedIn from './is-logged-in';

function redirect({requireLoggedIn, nextState, replace, store, location, navigate}) {
  const loggedIn = isLoggedIn(store.getState().auth.user);
  const meetsRequirement = requireLoggedIn ? loggedIn : !loggedIn;

  if (meetsRequirement) {
    return true;
  }

  let state;
  if (requireLoggedIn) {
    state = {
      nextPathname: nextState.location.pathname
    };
  }

  if (navigate) {
    replace({
      pathname: location,
      state
    });
  }

  return false;
}

// Pass a `store` to receive a `requireAuth` function. Use that function to
// ensure that a user is logged in before accessing a route. Unauthorized users
// will be redirected to `/login`
export default function generateRequireAuth(store) {
  return {
    mustBeLoggedIn(nextState, replace, navigate = true) {
      return redirect({
        store, nextState, replace, navigate,
        location: '/login',
        requireLoggedIn: true
      });
    },

    mustBeLoggedOut(nextState, replace, navigate = true) {
      return redirect({
        store, nextState, replace, navigate,
        location: '/',
        requireLoggedIn: false
      });
    }
  };
}
