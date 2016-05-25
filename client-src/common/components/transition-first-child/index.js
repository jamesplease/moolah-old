import React from 'react';

// This can be used as the `component` prop of a
// `ReactCSSTransitionGroup` to prevent a wrapping element
// when you're transitioning a single element. Not sure
// what that means? Read more here:
// https://facebook.github.io/react/docs/animation.html#rendering-a-single-child
export default function FirstChild(props) {
  var children = React.Children.toArray(props.children);
  return children[0] || null;
}
