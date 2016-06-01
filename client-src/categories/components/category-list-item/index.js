import React from 'react';

export default function CategoryListItem(props) {
  const {
    category, isOnline, onClickDelete,
    onClickEdit
  } = props;

  const deleteIsDisabled = !isOnline;

  return (
    <div className="resource-list-item category-list-item">
      <button className="category-list-item-label-btn" onClick={() => onClickEdit(category)}>
        <span className="category-list-item-emoji">
          {category.emoji}
        </span>
        <span className="category-list-item-label">
          {category.label}
        </span>
      </button>

      <button
        className="resource-list-item-delete"
        onClick={() => onClickDelete(category)}
        disabled={deleteIsDisabled}>
        Delete
      </button>
    </div>
  );
}
