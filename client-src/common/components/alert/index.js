import yo from 'yo-yo';
import store from '../../../redux/store';

export default function() {
  const online = store.getState().connection;
  var className = 'alert warning';
  if (!online) {
    className += ' visible';
  }

  return yo`
    <div className="${className}">
      <i class="zmdi zmdi-alert-triangle alert-icon"></i>
      You seem to have lost connection.
    </div>
  `;
}
