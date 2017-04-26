import _ from 'lodash';
import React from 'react';
import {formatDateForTransactionList} from '../services/format-date';
import emoji from '../../common/services/js-emoji';

export default function Transaction(props) {
  const {transaction, category, onClickDelete, onClickEdit} = props;
  const attrs = transaction.attributes;

  const categoryEmojiHtml = {
    __html: ''
  };

  const categoryEmoji = _.get(category, 'attributes.emoji');

  if (categoryEmoji) {
    categoryEmojiHtml.__html = emoji.replace_colons(categoryEmoji);
  }

  return (
    <li className="resourceListItem">
      <button className="transactionListItem-btn" onClick={() => onClickEdit(transaction)}>
        <div className="transactionListItem-editBtn-container">
          <span className="categoryListItem-emoji" dangerouslySetInnerHTML={categoryEmojiHtml}/>
          <span className="transactionListItem-description">
            {attrs.description}
          </span>
          <span className="transactionListItem-date">
            {formatDateForTransactionList(attrs.date)}
          </span>
          <span className="transactionListItem-amount">
            {attrs.value}
          </span>
        </div>
      </button>
      <button
        className="resourceListItem-deleteBtn transactionListItem-deleteBtn"
        onClick={() => onClickDelete(transaction)}>
        ×
      </button>
    </li>
  );
}
