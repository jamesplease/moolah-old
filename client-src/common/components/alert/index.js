import React from 'react';
import classNames from 'classnames';

// Each style of alert has a default icon. This maps an
// alert style to the class name representing that icon
const defaultIconMap = {
  success: 'zmdi-check',
  info: 'zmdi-info-outline',
  warning: 'zmdi-alert-triangle',
  danger: 'zmdi-alert-circle-o',
};

const Alert = React.createClass({
  componentDidTransition(transitionType) {
    const {
      destroyFirstAlert, persistent, animateOutAlert, onTransitionOutAlert
    } = this.props;

    if (transitionType === 'enter') {
      if (!persistent) {
        this._autodestruct = setTimeout(() => {
          animateOutAlert();
        }, 4000);
      }
    } else {
      destroyFirstAlert();
      onTransitionOutAlert();
    }
  },

  onManualDismiss() {
    const {animateOutAlert} = this.props;
    clearTimeout(this._autodestruct);
    animateOutAlert();
  },

  render() {
    const {
      style, icon, text, animatingAlertOut, isDismissable
    } = this.props;

    const styleClass = `alert-${style}`;
    const alertClass = classNames({
      alert: true,
      [styleClass]: true,
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

    const textHtml = {
      __html: text
    };

    return (
      <div className={alertClass}>
        <span className="alert-text">
          <i className={iconClass}/>
          <span dangerouslySetInnerHTML={textHtml}/>
        </span>
        {dismissBtn}
      </div>
    );
  }
});

export default Alert;
