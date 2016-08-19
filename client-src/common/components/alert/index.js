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
      style, text, animatingAlertOut, isDismissable, details
    } = this.props;

    const styleClass = `alert-${style}`;
    const alertClass = classNames({
      alert: true,
      [styleClass]: true,
      'alert-with-details': details,
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

    let detailsList;
    if (details && details.length) {
      detailsList = (
        <ul className="alert-details-list">
          {details.map(detail => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      );
    }

    return (
      <div className={alertClass}>
        <div className="alert-title-container">
          <span className="alert-title">
            {text}
          </span>
          {dismissBtn}
        </div>
        {detailsList}
      </div>
    );
  }
});

export default Alert;
