import React from 'react';

export default function EmptyCategories() {
  return (
    <div className="empty-resource-list">
      <div className="empty-resource-list-message">
        Categories will appear here.
      </div>
      <div className="empty-resource-list-explanation">
        Related transactions can be grouped together using categories.
      </div>
    </div>
  );
}
