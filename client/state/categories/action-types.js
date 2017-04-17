import keyMirror from 'keymirror';
import createAsyncConstants from '../util/create-async-constants';

const asyncActions = createAsyncConstants(
  'CREATE_CATEGORY',
  'RETRIEVE_CATEGORIES',
  'UPDATE_CATEGORY',
  'DELETE_CATEGORY'
);

export default keyMirror({
  ...asyncActions
});
