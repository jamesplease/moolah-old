import yo from 'yo-yo';
import Nav from '../nav';
import store from '../../../redux/store';
import * as uiActionCreators from '../../../redux/ui/action-creators';

function toggleMobileNav() {
  const isMobileMenuVisible = store.getState().ui.isMobileMenuVisible;
  store.dispatch(uiActionCreators.toggleMobileMenu(!isMobileMenuVisible))
}

export default function() {
  return yo`
    <header>
      <h1 className="app-logo">
        <a href="/">
          Moolah
        </a>
      </h1>
      <button className="mobile-menu-toggle" onclick=${toggleMobileNav}>
        <i class="zmdi zmdi-menu zmdi-hc-lg mobile-menu-toggle"></i>
      </button>
      ${Nav()}
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
