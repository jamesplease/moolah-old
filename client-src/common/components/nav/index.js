import yo from 'yo-yo';
import classNames from 'classnames';
import store from '../../../redux/store';

export default () => {
  const routeName = store.getState().history.routeName;

  const transactionsClass = classNames({
    active: routeName === 'transactions'
  });

  const categoriesClass = classNames({
    active: routeName === 'categories'
  });

  const analyticsClass = classNames({
    active: routeName === 'analytics'
  });

  return yo`
    <nav className="main-nav">
      <ul className="main-nav-list">
        <li>
          <a href="/transactions" className="${transactionsClass}">
            Transactions
          </a>
        </li>
        <li>
          <a href="/categories" className="${categoriesClass}">
            Categories
          </a>
        </li>
        <li>
          <a href="/analytics" className="${analyticsClass}">
            Analytics
          </a>
        </li>
      </ul>
    </nav>
  `;
}
