import yo from 'yo-yo';
import classNames from 'classnames';
import store from '../../../redux/store';

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
    <header>
      <h1 className="app-logo">
        <a href="/">
          Moolah
        </a>
      </h1>
      <i class="zmdi zmdi-menu zmdi-hc-lg mobile-menu-toggle"></i>
      <nav className="header-main-menu">
        <ul className="header-main-menu-list">
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
      <div className="header-profile-link">
        <a className="header-name">
          James S.
        </a>
        <img className="header-profile-pic"/>
      </div>
    </header>
  `;
}
