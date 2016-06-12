import keyMirror from 'keymirror';
import createAsyncConstants from '../util/create-async-constants';

const asyncActions = createAsyncConstants(
  'CREATE_TRANSACTION',
  'RETRIEVE_TRANSACTIONS',
  'UPDATE_TRANSACTION',
  'DELETE_TRANSACTION'
);

const syncActions = {
  SET_TRANSACTION_UPDATE_ID: null,
  CLEAR_TRANSACTION_UPDATE_ID: null
};

export default keyMirror({
  ...asyncActions,
  ...syncActions
});
