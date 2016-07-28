import React from 'react';
import emoji from '../../../common/services/js-emoji';

export default function CategoryListItem(props) {
  const {
    category, isOnline, onClickDelete,
    onClickEdit
  } = props;

  const deleteIsDisabled = !isOnline;

  const categoryEmojiHtml = {
    __html: ''
  };

  if (category.emoji) {
    categoryEmojiHtml.__html = emoji.replace_colons(category.emoji);
  }

  return (
    <li className="resourceListItem categoryListItem">
      <button className="categoryListItem-labelBtn" onClick={() => onClickEdit(category)}>
        <div className="categoryListItem-labelBtn-container">
          <span className="categoryListItem-emoji" dangerouslySetInnerHTML={categoryEmojiHtml}/>
          <span className="categoryListItem-label">
            {category.label}
          </span>
        </div>
      </button>

      <button
        className="resourceListItem-delete"
        onClick={() => onClickDelete(category)}
        disabled={deleteIsDisabled}>
        Delete
      </button>
    </li>
  );
}
