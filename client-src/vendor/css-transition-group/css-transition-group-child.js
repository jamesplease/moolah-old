import React from 'react';
import ReactDOM from 'react-dom';
import CSSCore from './css-core';
import ReactTransitionEvents from './react-transition-events';

var TICK = 17;

var ReactCSSTransitionGroupChild = React.createClass({
  displayName: 'ReactCSSTransitionGroupChild',

  propTypes: {
    name: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.shape({
        enter: React.PropTypes.string,
        leave: React.PropTypes.string,
        active: React.PropTypes.string,
      }),
      React.PropTypes.shape({
        enter: React.PropTypes.string,
        enterActive: React.PropTypes.string,
        leave: React.PropTypes.string,
        leaveActive: React.PropTypes.string,
        appear: React.PropTypes.string,
        appearActive: React.PropTypes.string,
      }),
    ]).isRequired,

    // Once we require timeouts to be specified, we can remove the
    // boolean flags (appear etc.) and just accept a number
    // or a bool for the timeout flags (appearTimeout etc.)
    appear: React.PropTypes.bool,
    enter: React.PropTypes.bool,
    leave: React.PropTypes.bool,
    appearTimeout: React.PropTypes.number,
    enterTimeout: React.PropTypes.number,
    leaveTimeout: React.PropTypes.number,
  },

  transition: function(animationType, finishCallback, userSpecifiedDelay) {
    var node = ReactDOM.findDOMNode(this);

    if (!node) {
      if (finishCallback) {
        finishCallback();
      }
      return;
    }

    var childRef = this.childRef;
    var className = this.props.name[animationType] || this.props.name + '-' + animationType;
    var activeClassName = this.props.name[animationType + 'Active'] || className + '-active';
    var timeout = null;

    var endListener = function(e) {
      if (e && e.target !== node) {
        return;
      }

      clearTimeout(timeout);

      CSSCore.removeClass(node, className);
      CSSCore.removeClass(node, activeClassName);

      if (childRef && childRef.componentDidTransition) {
        childRef.componentDidTransition(animationType);
      }

      ReactTransitionEvents.removeEndEventListener(node, endListener);

      // Usually this optional callback is used for informing an owner of
      // a leave animation and telling it to remove the child.
      if (finishCallback) {
        finishCallback();
      }
    };

    if (childRef && childRef.componentWillTransition) {
      childRef.componentWillTransition(animationType);
    }

    CSSCore.addClass(node, className);

    // Need to do this to actually trigger a transition.
    this.queueClassAndNode(activeClassName, node);

    // If the user specified a timeout delay.
    if (userSpecifiedDelay) {
      // Clean-up the animation after the specified delay
      timeout = setTimeout(endListener, userSpecifiedDelay);
      this.transitionTimeouts.push(timeout);
    } else {
      // DEPRECATED: this listener will be removed in a future version of react
      ReactTransitionEvents.addEndEventListener(node, endListener);
    }
  },

  queueClassAndNode: function(className, node) {
    this.classNameAndNodeQueue.push({
      className: className,
      node: node,
    });

    if (!this.timeout) {
      this.timeout = setTimeout(this.flushClassNameAndNodeQueue, TICK);
    }
  },

  flushClassNameAndNodeQueue: function() {
    if (this.isMounted()) {
      this.classNameAndNodeQueue.forEach(function(obj) {
        CSSCore.addClass(obj.node, obj.className);
      });
    }
    this.classNameAndNodeQueue.length = 0;
    this.timeout = null;
  },

  componentWillMount: function() {
    this.classNameAndNodeQueue = [];
    this.transitionTimeouts = [];
    this.childRef = null;
  },

  componentWillUnmount: function() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.transitionTimeouts.forEach(function(timeout) {
      clearTimeout(timeout);
    });

    this.classNameAndNodeQueue.length = 0;
  },

  componentWillAppear: function(done) {
    if (this.props.appear) {
      this.transition('appear', done, this.props.appearTimeout);
    } else {
      done();
    }
  },

  componentWillEnter: function(done) {
    if (this.props.enter) {
      this.transition('enter', done, this.props.enterTimeout);
    } else {
      done();
    }
  },

  componentWillLeave: function(done) {
    if (this.props.leave) {
      this.transition('leave', done, this.props.leaveTimeout);
    } else {
      done();
    }
  },

  render: function() {
    var child = this.props.children;
    var origRefCallback = child.ref;

    var self = this;
    return React.cloneElement(child, {
      ref: function(c) {
        if (origRefCallback) {
          origRefCallback(c);
        }
        self.childRef = c;
      },
    });
  },
});

export default ReactCSSTransitionGroupChild;
