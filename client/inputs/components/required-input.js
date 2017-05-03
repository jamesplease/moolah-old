import React from 'react';

export default function RequiredInput(props) {
  return (
    <div className="requiredInput">
      <input {...props}/>
      {!props.value && (
        <span className="requiredInput_requiredText">
          Required
        </span>
      )}
    </div>
  );
}
