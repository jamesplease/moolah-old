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
    text
  } = props;

  if (!visible) {
    return null;
  }

  const alertClass = classNames({
    alert: true,
    [style]: true,
    visible: visible
  });

  // If the user has passed an `icon`, then we use that value
  // for the class of the icon. Otherwise, we use the default value.
  const materialIconClass = icon ? icon : defaultIconMap[style];

  const iconClass = classNames({
    zmdi: true,
    'alert-icon': true,
    [materialIconClass]: true
  });

  return (
    <div className={alertClass}>
      <i className={iconClass}></i>
      {text}
    </div>
  );
}
