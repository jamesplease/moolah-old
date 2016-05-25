import _ from 'lodash';
import React from 'react';

export default function CategoryListItem(props) {
  const {
    category, isOnline, onClickDelete,
    currentlyDeleting
  } = props;

  const isDeleting = _.includes(currentlyDeleting, category.id);
  const deleteIsDisabled = isDeleting || !isOnline;

  return (
    <div className="resource-list-item category-list-item">
      <span className="category-list-item-emoji">
        {category.emoji}
      </span>
      <span className="category-list-item-label">
        {category.label}
      </span>
      <button
        className="resource-list-item-delete"
        onClick={() => onClickDelete(category)}
        disabled={deleteIsDisabled}>
        Delete
      </button>
    </div>
  );
}
