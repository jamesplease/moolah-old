import keyMirror from 'keymirror';
import createAsyncConstants from '../util/create-async-constants';

export default keyMirror(createAsyncConstants(
  'CREATE_TRANSACTION',
  'RETRIEVE_TRANSACTIONS',
  'UPDATE_TRANSACTION',
  'DELETE_TRANSACTION'
));
