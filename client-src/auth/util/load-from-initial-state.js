// Loads the user from the initial state
import store from '../../redux/store';
import {signIn} from '../../redux/auth/action-creators';

const initialDataEl = document.getElementById('initial-data');
const dataJSON = initialDataEl.text;

export default function() {
  let initialData;
  try {
    initialData = JSON.parse(dataJSON);
  } catch (e) {
    initialData = {};
  }

  const user = initialData.user;

  if (user) {
    console.log('signed in!');
    store.dispatch(signIn(user));
  } else {
    console.log('not signed in');
  }
}
