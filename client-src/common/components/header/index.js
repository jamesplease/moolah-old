import yo from 'yo-yo';
import classNames from 'classnames';
import store from '../../../redux/store';

export default function() {
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
    <header>
      <h1 className="app-logo">
        <a href="/">
          Moolah
        </a>
      </h1>
      <button className="mobile-menu-toggle">
        <i class="zmdi zmdi-menu zmdi-hc-lg mobile-menu-toggle"></i>
      </button>
      <nav className="header-main-menu">
        <ul className="header-main-menu-list">
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
      <div className="header-profile-container">
        <a className="header-profile-link" href="/profile">
          <span className="header-name">
            James S.
          </span>
          <img className="header-profile-pic" />
        </a>

      </div>
    </header>
  `;
}
