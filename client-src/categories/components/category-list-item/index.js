import React from 'react';

export default function CategoryListItem(props) {
  const {
    category, isOnline, onClickDelete,
    onClickEdit
  } = props;

  const deleteIsDisabled = !isOnline;

  return (
    <div className="resource-list-item category-list-item">
      <button
        className="category-list-item-emoji"
        onClick={() => onClickEdit(category)}>
        {category.emoji}
      </button>
      <button
        className="category-list-item-label"
        onClick={() => onClickEdit(category)}>
        {category.label}
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
