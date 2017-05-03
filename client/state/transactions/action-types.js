import keyMirror from 'keymirror';
import createAsyncConstants from '../utils/create-async-constants';

const asyncActions = createAsyncConstants(
  'CREATE_TRANSACTION',
  'RETRIEVE_TRANSACTIONS',
  'UPDATE_TRANSACTION',
  'DELETE_TRANSACTION'
);

export default keyMirror({
  ...asyncActions
});
