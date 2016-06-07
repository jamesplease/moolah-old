import React from 'react';
import emojiList from '../../../common/services/emoji-list';

const emojiListHtml = _.reduce(emojiList.byName, (memo, v) => {
  return `${memo}<li class="emoji-picker-list-item order-${v.order}">${v.html}</li>`;
}, '');
const emojiListInnerHtml = {
  __html: emojiListHtml
};

export default function EmojiPicker() {
  return (
    <div className="emoji-picker">
      <ul className="emoji-picker-categories">
        {emojiList.categories.map(category => (
          <li key={category.name}>
            {category.name}
          </li>
        ))}
      </ul>
      <div className="emoji-picker-body">
        <input
          type="text"
          placeholder="Search for emoji..."
          className="text-input emoji-picker-search"/>
        <ul className="emoji-picker-list" dangerouslySetInnerHTML={emojiListInnerHtml}/>
      </div>
    </div>
  );
}
