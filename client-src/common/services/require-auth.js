// Pass a `store` to receive a `requireAuth` function. Use that function to
// ensure that a user is logged in before accessing a route. Unauthorized users
// will be redirected to `/login`
export default function generateRequireAuth(store) {
  // Specify this as the `onEnter` callback of any route that needs a router
  return function requireAuth(nextState, replace) {
    const loggedIn = !store.getState().auth.user;
    if (!loggedIn) {
      replace({
        pathname: '/login',
        state: {
          nextPathname: nextState.location.pathname
        }
      });
    }
  };
}
