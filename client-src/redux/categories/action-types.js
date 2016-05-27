import keyMirror from 'keymirror';
import createAsyncConstants from '../util/create-async-constants';

const asyncActions = createAsyncConstants(
  'CREATE_CATEGORY',
  'RETRIEVE_CATEGORIES',
  'UPDATE_CATEGORY',
  'DELETE_CATEGORY'
);

const syncActions = {
  SET_CATEGORY_UPDATE_ID: null,
  CLEAR_CATEGORY_UPDATE_ID: null
};

export default keyMirror({
  ...asyncActions,
  ...syncActions
});
