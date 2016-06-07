import _ from 'lodash';
import React from 'react';
import emojiList from '../../../common/services/emoji-list';

const html = _.reduce(emojiList.byName, (memo, v, name) => {
  return `${memo}<li>${v}</li>`;
}, '');

const innerHtml = {
  __html: html
};

export default function Profile() {
  return (
    <div className="container">
      <div className="profile" dangerouslySetInnerHTML={innerHtml}>
      </div>
    </div>
  );
}
