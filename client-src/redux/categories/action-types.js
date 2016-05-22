import keyMirror from 'keymirror';
import createAsyncConstants from '../util/create-async-constants';

export default keyMirror(createAsyncConstants(
  'CREATE_CATEGORY',
  'RETRIEVE_CATEGORIES',
  'UPDATE_CATEGORY',
  'DELETE_CATEGORY'
));
