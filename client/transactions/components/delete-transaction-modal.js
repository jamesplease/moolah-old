import _ from 'lodash';
import React from 'react';

export default function DeleteTransactionModal(props) {
  const {onClickCancel, onClickDelete, isDeletingTransaction, transaction} = props;
  const deleteBtnText = isDeletingTransaction ? 'Deleting...' : 'Delete';

  const attrs = _.defaults(transaction.attributes, {
    description: '',
    value: ''
  });

  let displayText = attrs.description;
  if (attrs.value) {
    displayText += ` - ${attrs.value}`;
  }

  return (
    <div className="deleteTransactionModal">
      <h1 className="modal-title">
        Delete "{displayText}"?
      </h1>
      <div className="modal-footer">
        <button
          onClick={() => onClickCancel()}
          className="btn btn-secondary deleteTransactionModal-cancelBtn"
          disabled={isDeletingTransaction}>
          Cancel
        </button>
        <button
          onClick={() => onClickDelete()}
          className="btn btn-danger deleteTransactionModal-deleteBtn"
          disabled={isDeletingTransaction}>
          {deleteBtnText}
        </button>
      </div>
    </div>
  );
}
