import yo from 'yo-yo';

export default function() {
  return yo`
    <header>
      <h1 className="app-logo">
        Moolah
      </h1>
      <i class="zmdi zmdi-menu zmdi-hc-lg mobile-menu-toggle"></i>
      <nav className="header-main-menu">
        <ul className="header-main-menu-list">
          <li>
            <a href="/transactions" className="active">
              Transactions
            </a>
          </li>
          <li>
            <a href="/analytics">
              Analytics
            </a>
          </li>
          <li>
            <a href="/profile">
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
