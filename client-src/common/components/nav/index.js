import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';
import {Link} from 'react-router';
import TransitionFirstChild from '../transition-first-child';

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

  const overlayNavOnlyListItemClass = classNames({
    [listItemClass]: true,
    'mainNav-listItem-smallScreenOnly': true
  });

  const transitionGroupProps = {
    transitionName: 'overlayNav',
    transitionAppear: true,
    transitionEnterTimeout: 150,
    transitionLeaveTimeout: 150,
    transitionAppearTimeout: 150,
    component: TransitionFirstChild
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
          <li className={overlayNavOnlyListItemClass}>
            <Link
              to="/"
              onClick={onClickNavItem}
              className="mainNav-listItem-link"
              activeClassName="active">
              Dashboard
            </Link>
          </li>
          <li className={listItemClass}>
            <Link
              to="/transactions/this-month"
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
          <li className={listItemClass}>
            <Link
              to="/analytics"
              onClick={onClickNavItem}
              className="mainNav-listItem-link"
              activeClassName="active">
              Analytics
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
