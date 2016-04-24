import yo from 'yo-yo';
import store from '../../../redux/store';
import classNames from 'classnames';

export default function() {
  const routeName = store.getState().history.routeName;

  const transactionsClass = classNames({
    active: routeName === 'transactions'
  });

  const analyticsClass = classNames({
    active: routeName === 'analytics'
  });

  const profileClass = classNames({
    active: routeName === 'profile'
  });

  return yo`
    <footer>
      <nav>
        <ul>
          <li>
            <a href="/transactions" className="${transactionsClass}">
              Transactions
            </a>
          </li>
          <li>
            <a href="/analytics" className="${analyticsClass}">
              Analytics
            </a>
          </li>
          <li>
            <a href="/profile" className="${profileClass}">
              Profile
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  `;
}
