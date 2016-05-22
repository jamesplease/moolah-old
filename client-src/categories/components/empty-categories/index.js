import React from 'react';

export default function EmptyCategories() {
  return (
    <div className="empty-resource-list">
      <div className="empty-resource-list-message">
        There are no categories.
      </div>
      <div className="empty-resource-list-explanation">
        This page will list categories that you create. Related transactions
        can be grouped together using categories.
      </div>
    </div>
  );
}
