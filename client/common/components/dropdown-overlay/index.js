import React from 'react';

const noop = () => {
  // Intentionally left blank
};

export default function DropdownOverlay({onClick}) {
  let clickHandler = onClick ? onClick : noop;
  return (
    <div className="dropdownOverlay" onClick={clickHandler}/>
  );
}
