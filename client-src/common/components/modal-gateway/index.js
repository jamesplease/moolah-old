import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TransitionFirstChild from '../transition-first-child';

const transitionGroupProps = {
  transitionName: 'modal',
  transitionAppear: true,
  transitionEnterTimeout: 2000,
  transitionLeaveTimeout: 2000,
  transitionAppearTimeout: 2000,
  component: TransitionFirstChild
};

export default function ModalGateway({children}) {
  return (
    <ReactCSSTransitionGroup {...transitionGroupProps}>
      {children}
    </ReactCSSTransitionGroup>
  );
}
