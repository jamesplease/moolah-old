import React from 'react';
import classNames from 'classnames';

const noop = () => {
  // Intentionally left blank
};

export default function DropdownOverlay({onClick, visible}) {
  let clickHandler = onClick ? onClick : noop;
  const classes = classNames('dropdownOverlay', {'dropdownOverlay-visible': visible});

  return (
    <div className={classes} onClick={clickHandler}/>
  );
}
