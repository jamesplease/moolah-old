// For logged-in users, this initial state is sent over from the server.
// So you may not notice any differences in the initial state if you make
// changes directly to this file.
export default {
  user: null,
  userMeta: {
    logins: [],
    updateXhrStatus: 'NULL',
    updatingAttributes: {}
  }
};
