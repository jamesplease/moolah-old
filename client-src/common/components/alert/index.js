import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {findDOMNode} from 'react-dom';
import classNames from 'classnames';
import TransitionFirstChild from '../transition-first-child';

// Each style of alert has a default icon. This maps an
// alert style to the class name representing that icon
const defaultIconMap = {
  success: 'zmdi-check',
  info: 'zmdi-info-outline',
  warning: 'zmdi-alert-triangle',
  danger: 'zmdi-alert-circle-o',
};

const Alert = React.createClass({
  componentWillMount() {
    // Dismissable alerts will dismiss themselves after some time
    if (!this.props.persistent) {
      this._autodestruct = window.setTimeout(() => {
        this.props.dismissCurrentAlert();
      }, 120000);
    }
  },

  componentDidUpdate() {
    const {
      setAlertHeight, alertHeight, clearAlertHeight
    } = this.props;

    const node = ReactDOM.findDOMNode(this.refs.alertBody);
    if (!node) {
      if (alertHeight !== null ) {
        clearAlertHeight();
      }
      return;
    }
    const nodeHeight = node.offsetHeight;
    if (nodeHeight > 68 && nodeHeight !== alertHeight) {
      setAlertHeight(nodeHeight);
    }
  },

  componentWillUnmount() {
    const {
      showNextAlert, onDismissAction,
      dispatch
    } = this.props;

    window.clearTimeout(this._autodestruct);

    // If the alert was given an action to emit when it unmounts,
    // then we call that now.
    if (onDismissAction) {
      dispatch(onDismissAction);
    }

    showNextAlert();
  },

  render() {
    const {
      style,
      icon,
      text,
      alertIsActive,
      isDismissable,
      dismissCurrentAlert
    } = this.props;

    const alertClass = classNames({
      alert: true,
      [style]: true,
      'dismissable-alert': isDismissable
    });

    // If the user has passed an `icon`, then we use that value
    // for the class of the icon. Otherwise, we use the default value.
    const materialIconClass = icon ? icon : defaultIconMap[style];

    const iconClass = classNames({
      zmdi: true,
      'alert-icon': true,
      [materialIconClass]: true
    });

    let dismissIcon;
    if (isDismissable) {
      // If the modal is being hidden, then we can't dismiss it
      const dismissDisabled = !alertIsActive;
      dismissIcon = (
        <button
          className="alert-dismiss"
          disabled={dismissDisabled}
          onClick={() => dismissCurrentAlert()}>
          <i className="zmdi zmdi-close"/>
        </button>
      );
    }

    const textHtml = {
      __html: text
    };

    const transitionGroupProps = {
      transitionName: 'alert',
      transitionAppear: true,
      transitionEnterTimeout: 250,
      transitionLeaveTimeout: 150,
      transitionAppearTimeout: 250,
      component: TransitionFirstChild
    };

    let alert;
    if (alertIsActive) {
      alert = (
        <div className={alertClass} ref="alertBody">
          <span className="alert-text">
            <span dangerouslySetInnerHTML={textHtml}/>
          </span>
          {dismissIcon}
        </div>
      );
    }

    return (
      <div className="alert-container">
        <ReactCSSTransitionGroup {...transitionGroupProps}>
          {alert}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

export default Alert;
