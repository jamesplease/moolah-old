import yo from 'yo-yo';
import store from '../../../redux/store';

export default function() {
  const online = store.getState().connection;
  var className = 'alert';
  if (!online) {
    className += ' visible';
  }

  return yo`
    <div className="${className}">
      You seem to have lost connection.
    </div>
  `;
}
