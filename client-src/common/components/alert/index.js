import React from 'react';
import classNames from 'classnames';

const Alert = React.createClass({
  componentDidTransition(transitionType) {
    const {
      destroyFirstAlert, persistent, animateOutAlert
    } = this.props;

    if (transitionType === 'enter') {
      if (!persistent) {
        this._autodestruct = setTimeout(() => {
          animateOutAlert();
        }, 4000);
      }
    } else {
      destroyFirstAlert();
    }
  },

  onManualDismiss() {
    const {animateOutAlert} = this.props;
    clearTimeout(this._autodestruct);
    animateOutAlert();
  },

  render() {
    const {
      style, text, animatingAlertOut, isDismissable
    } = this.props;

    const styleClass = `alert-${style}`;
    const alertClass = classNames({
      alert: true,
      [styleClass]: true,
      'dismissable-alert': isDismissable
    });

    let dismissBtn;
    if (isDismissable) {
      dismissBtn = (
        <button
          className="alert-dismiss"
          disabled={animatingAlertOut}
          onClick={this.onManualDismiss}>
          <i className="zmdi zmdi-close"/>
        </button>
      );
    }

    return (
      <div className={alertClass}>
        <span className="alert-title">
          {text}
        </span>
        {dismissBtn}
      </div>
    );
  }
});

export default Alert;
