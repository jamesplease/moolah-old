import store from '../../redux/store';
import * as actionCreators from '../../redux/connection/action-creators';

function dispatchOnline() {
  store.dispatch(actionCreators.userOnline());
}

function dispatchOffline() {
  store.dispatch(actionCreators.userOffline());
}

export default {
  registerListener() {
    window.addEventListener('online', dispatchOnline);
    window.addEventListener('offline', dispatchOffline);
  }
};
