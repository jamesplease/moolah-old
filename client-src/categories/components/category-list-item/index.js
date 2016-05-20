import React from 'react';

export default function CategoryListItem({category}) {
  return (
    <li className="resource-list-item category-list-item">
      <span className="category-list-item-emoji">
        🤔
      </span>
      <span className="category-list-item-label">
        {category.label}
      </span>
      <button className="delete-category">
        Delete
      </button>
    </li>
  );
}
