import React from 'react';

export default function CategoriesSubheader() {
  function onClickNew() {
    console.log('clicked');
  }

  const disabled = false;

  return (
    <div className="sub-header">
      <div className="container">
        <h1 className="subheader-title">
          Categories
        </h1>
        <button
          className="subheader-action btn btn-line"
          onClick={onClickNew}
          disabled={disabled}>
          + Category
        </button>
      </div>
    </div>
  );
}
