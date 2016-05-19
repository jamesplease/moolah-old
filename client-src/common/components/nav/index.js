import yo from 'yo-yo';
import classNames from 'classnames';
import store from '../../../redux/store';
import * as uiActionCreators from '../../../redux/ui/action-creators';

function onClickNavItem() {
  store.dispatch(uiActionCreators.toggleMobileMenu(false));
}

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
          <a href="/transactions" className="${transactionsClass}" onclick=${onClickNavItem}>
            Transactions
          </a>
        </li>
        <li>
          <a href="/categories" className="${categoriesClass}" onclick=${onClickNavItem}>
            Categories
          </a>
        </li>
        <li>
          <a href="/analytics" className="${analyticsClass}" onclick=${onClickNavItem}>
            Analytics
          </a>
        </li>
      </ul>
    </nav>
  `;
}
