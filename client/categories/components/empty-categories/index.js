import React from 'react';

export default function EmptyCategories() {
  return (
    <div className="emptyResourceList">
      <div className="emptyResourceList-message">
        There are no categories.
      </div>
      <div className="emptyResourceList-explanation">
        This page will list categories that you create. Related transactions
        can be grouped together using categories.
      </div>
    </div>
  );
}
