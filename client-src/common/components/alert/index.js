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

export default function Alert(props) {
  const {
    visible,
    style,
    icon,
    text,
    undoCallback,
    isDismissable,
    dismissCurrentAlert
  } = props;

  const alertClass = classNames({
    alert: true,
    [style]: true,
    visible
  });

  // If the user has passed an `icon`, then we use that value
  // for the class of the icon. Otherwise, we use the default value.
  const materialIconClass = icon ? icon : defaultIconMap[style];

  const iconClass = classNames({
    zmdi: true,
    'alert-icon': true,
    [materialIconClass]: true
  });

  let undoText;
  if (undoCallback) {
    undoText = (
      <button className="alert-undo" onClick={undoCallback}>
        Undo
      </button>
    );
  }

  let dismissIcon;
  if (isDismissable) {
    // If the modal is being hidden, then we can't dismiss it
    const dismissDisabled = !visible;
    dismissIcon = (
      <button
        className="alert-dismiss"
        disabled={dismissDisabled}
        onClick={() => dismissCurrentAlert()}>
        <i className="zmdi zmdi-close"/>
      </button>
    );
  }

  return (
    <div className={alertClass}>
      <span className="alert-text">
        <i className={iconClass}></i>
        {text}
        {undoText}
      </span>
      {dismissIcon}
    </div>
  );
}
