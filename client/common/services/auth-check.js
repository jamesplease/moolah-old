function redirect({requireLoggedIn, nextState, replace, store, location}) {
  const isLoggedIn = Boolean(store.getState().auth.user);
  const meetsRequirement = requireLoggedIn ? isLoggedIn : !isLoggedIn;

  if (meetsRequirement) {
    return true;
  }

  let state;
  if (requireLoggedIn) {
    state = {
      nextPathname: nextState.location.pathname
    };
  }

  replace({
    pathname: location,
    state
  });

  return false;
}

// Pass a `store` to receive a `requireAuth` function. Use that function to
// ensure that a user is logged in before accessing a route. Unauthorized users
// will be redirected to `/login`
export default function generateRequireAuth(store) {
  return {
    mustBeLoggedIn(nextState, replace) {
      return redirect({
        store, nextState, replace,
        location: '/login',
        requireLoggedIn: true
      });
    },

    mustBeLoggedOut(nextState, replace) {
      return redirect({
        store, nextState, replace,
        location: '/',
        requireLoggedIn: false
      });
    }
  };
}
