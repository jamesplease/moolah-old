import React from 'react';

export default function DeleteCategoryModal(props) {
  const {onClickCancel, onClickDelete, deletingCategory, category} = props;
  const deleteBtnText = deletingCategory ? 'Deleting...' : 'Delete';

  return (
    <div className="deleteCategoryModal">
      <h1 className="modal-title">
        Delete "{category.label}" category?
      </h1>
      <div className="modal-footer">
        <button
          onClick={() => onClickCancel()}
          className="btn btn-secondary deleteCategoryModal-cancelBtn"
          disabled={deletingCategory}>
          Cancel
        </button>
        <button
          onClick={() => onClickDelete()}
          className="btn btn-danger deleteCategoryModal-deleteBtn"
          disabled={deletingCategory}>
          {deleteBtnText}
        </button>
      </div>
    </div>
  );
}
