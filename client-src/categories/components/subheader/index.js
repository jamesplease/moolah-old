import React from 'react';
import {connect} from 'react-redux';

export function CategoriesSubheader({isOnline}) {
  function onClickNew() {
    console.log('clicked');
  }

  const disabled = !isOnline;

  return (
    <div className="sub-header">
      <div className="container">
        <h1 className="subheader-title">
          Categories
        </h1>
        <button
          className="subheader-action btn"
          onClick={onClickNew}
          disabled={disabled}>
          + Category
        </button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isOnline: state.connection
  };
}

export default connect(mapStateToProps)(CategoriesSubheader);
