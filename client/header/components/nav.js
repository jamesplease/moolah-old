import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router';
import FirstChild from '../../common/components/first-child';
import ReactCSSTransitionGroup from '../../vendor/css-transition-group';

export default function Nav({isOverlayNavVisible, toggleOverlayNav}) {
  // This ensures that the overlay nav gets closed anytime a link is clicked
  function onClickNavItem() {
    if (!isOverlayNavVisible) { return; }
    toggleOverlayNav();
  }

  const mainNavClass = classNames({
    mainNav: true,
    'mainNav-overlayVisible': isOverlayNavVisible
  });

  const listItemClass = classNames({
    'mainNav-listItem': true,
  });

  const transitionGroupProps = {
    transitionName: 'overlayNav',
    transitionAppear: true,
    transitionEnterTimeout: 150,
    transitionLeaveTimeout: 150,
    transitionAppearTimeout: 150,
    component: FirstChild
  };

  let overlayMenuBackdrop;
  if (isOverlayNavVisible) {
    overlayMenuBackdrop = (
      <div className="overlayNav"/>
    );
  }

  return (
    <div>
      <nav className={mainNavClass}>
        <ul className="mainNav-list">
          <li className={listItemClass}>
            <Link
              to="/transactions"
              onClick={onClickNavItem}
              className="mainNav-listItem-link"
              activeClassName="active">
              Transactions
            </Link>
          </li>
          <li className={listItemClass}>
            <Link
              to="/categories"
              onClick={onClickNavItem}
              className="mainNav-listItem-link"
              activeClassName="active">
              Categories
            </Link>
          </li>
        </ul>
      </nav>
      <ReactCSSTransitionGroup {...transitionGroupProps}>
        {overlayMenuBackdrop}
      </ReactCSSTransitionGroup>
    </div>
  );
}
