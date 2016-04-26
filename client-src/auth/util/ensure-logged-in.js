import store from '../../redux/store';

export default function(redirect, render) {
  if (store.getState().auth.user) {
    return render;
  } else {
    return redirect;
  }
}
