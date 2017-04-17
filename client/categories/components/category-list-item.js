import React from 'react';
import emoji from '../../common/services/js-emoji';

export default function CategoryListItem(props) {
  const {
    category, isOnline, onClickDelete, onClickEdit
  } = props;

  const deleteIsDisabled = !isOnline;
  const attrs = category.attributes;

  const categoryEmojiHtml = {
    __html: ''
  };

  if (attrs.emoji) {
    categoryEmojiHtml.__html = emoji.replace_colons(attrs.emoji);
  }

  return (
    <li className="resourceListItem categoryListItem">
      <button className="categoryListItem-labelBtn" onClick={() => onClickEdit(category)}>
        <div className="categoryListItem-labelBtn-container">
          <span className="categoryListItem-emoji" dangerouslySetInnerHTML={categoryEmojiHtml}/>
          <span className="categoryListItem-label">
            {attrs.label}
          </span>
        </div>
      </button>
      <button
        className="resourceListItem-deleteBtn"
        onClick={() => onClickDelete(category)}
        disabled={deleteIsDisabled}>
        Delete
      </button>
    </li>
  );
}
