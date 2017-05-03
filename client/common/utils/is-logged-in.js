// Pass in a user from `store.auth.user`.
// Returns `true` if logged in, `false` otherwise
export default (user = {}) => {
  return Boolean(user.id);
};
