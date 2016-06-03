import React from 'react';
import emoji from '../../../common/services/js-emoji';

export default function CategoryListItem(props) {
  const {
    category, isOnline, onClickDelete,
    onClickEdit
  } = props;

  const deleteIsDisabled = !isOnline;

  const categoryEmojiHtml = {
    __html: emoji.replace_colons(category.emoji)
  };

  return (
    <li className="resource-list-item category-list-item">
      <button className="category-list-item-label-btn" onClick={() => onClickEdit(category)}>
        <span className="category-list-item-emoji" dangerouslySetInnerHTML={categoryEmojiHtml}/>
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
    </li>
  );
}
