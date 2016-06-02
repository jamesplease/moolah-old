import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';

const DeleteCategoryModal = React.createClass({
  componentWillUnmount() {
    this.props.dismissError();
  },

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

    const deleteBtnText = props.currentlyDeleting ? 'Deleting...' : 'Delete';

    const errorMsg = props.actionFailure ? 'There was an error' : null;

    const errorClass = classNames({
      'modal-error form-error': true,
      visible: props.actionFailure
    });

    const modalClass = classNames({
      'delete-category-modal': true,
      'modal-form-invalid': props.actionFailure
    });

    return (
      <div className={modalClass}>
        <h1 className="modal-title">
          Delete "{props.category.label}"?
        </h1>
        <div className={errorClass}>
          {errorMsg}
        </div>
        <div className="form-row">
          <button
            onClick={onClickCancelBtn}
            className="btn btn-line delete-category-modal-cancel"
            disabled={props.currentlyDeleting}>
            Cancel
          </button>
          <button
            onClick={onClickDeleteBtn}
            className="btn btn-danger delete-category-modal-confirm"
            disabled={props.currentlyDeleting}>
            {deleteBtnText}
          </button>
        </div>
      </div>
    );
  }
});

export default DeleteCategoryModal;
