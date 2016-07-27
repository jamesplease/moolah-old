import _ from 'lodash';
import React from 'react';

const DeleteCategoryModal = React.createClass({
  render() {
    const props = this.props;

    function onClickCancelBtn(e) {
      e.preventDefault();
      _.result(props, 'onClickCancel');
    }

    function onClickDeleteBtn(e) {
      e.preventDefault();
      _.result(props, 'onClickDelete');
    }

    const deleteBtnText = props.deletingCategory ? 'Deleting...' : 'Delete';

    return (
      <div className="delete-category-modal">
        <h1 className="modal-title">
          Delete "{props.category.label}"?
        </h1>
        <div className="form-row">
          <button
            onClick={onClickCancelBtn}
            className="btn btn-line delete-category-modal-cancel"
            disabled={props.deletingCategory}>
            Cancel
          </button>
          <button
            onClick={onClickDeleteBtn}
            className="btn btn-danger delete-category-modal-confirm"
            disabled={props.deletingCategory}>
            {deleteBtnText}
          </button>
        </div>
      </div>
    );
  }
});

export default DeleteCategoryModal;
