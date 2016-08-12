import _ from 'lodash';
import React from 'react';
import {reduxForm} from 'redux-form';
import classNames from 'classnames';

const ModifyCategoryModal = React.createClass({
  componentDidMount() {
    this.labelInput.focus();
  },

  getInitialState() {
    return {
      cancelBegun: false
    };
  },

  mouseDownCancel() {
    const {
      fields: {label}
    } = this.props;

    const labelIsInvalid = label.error && label.touched;

    // redux-form is quick to the draw on making the form invalid. In fact,
    // it happens so fast that simply mousing down on the cancel can cause
    // the error message to appear. The error message physically moves the
    // cancel button, making the click miss the button entirely. Not good. This
    // callback is called before that ever happens, so we set some state to let
    // redux-form know to wait a second if the form isn't already invalid.
    // If, on the other hand, it's already invalid, then we don't need to do
    // this check at all.
    if (!labelIsInvalid) {
      this.setState({
        cancelBegun: true
      });
    }
  },

  mouseUpOnComponent() {
    this.setState({
      cancelBegun: false
    });
  },

  render() {
    const {
      fields: {label},
      handleSubmit,
      confirmInProgress,
      onClickCancel,
      isEditMode
    } = this.props;

    function onClickCancelBtn(e) {
      e.preventDefault();
      onClickCancel();
    }

    function onFormSubmit(e) {
      e.preventDefault();
      handleSubmit();
    }

    const labelIsInvalid = label.error && label.touched;
    const treatFormInvalid = labelIsInvalid && !this.state.cancelBegun;

    const labelClass = classNames({
      'text-input': true,
      newCategoryName: true,
      'invalid-input': treatFormInvalid
    });

    const modalTitle = isEditMode ? 'Edit category' : 'New category';

    let confirmText;
    if (isEditMode) {
      confirmText = confirmInProgress ? 'Editing...' : 'Edit';
    } else {
      confirmText = confirmInProgress ? 'Creating...' : 'Create';
    }

    let errorMsg;
    if (treatFormInvalid && label.error === 'empty') {
      errorMsg = 'A name is required';
    } else if (treatFormInvalid && label.error === 'duplicate') {
      errorMsg = 'Category already exists';
    }

    let errorEl;
    if (treatFormInvalid) {
      errorEl = (
        <div className="modal-error form-error">
          {errorMsg}
        </div>
      );
    }

    const modalClass = classNames({
      createCategoryModal: true,
      'modal-form-invalid': treatFormInvalid
    });

    return (
      <div className={modalClass} onMouseUp={this.mouseUpOnComponent}>
        <h1 className="modal-title">
          {modalTitle}
        </h1>
        {errorEl}
        <form onSubmit={onFormSubmit}>
          <div className="form-row">
            <div className="createCategoryModal-emojiSelect">
              🙃
            </div>
            <input
              type="text"
              className={labelClass}
              placeholder="Enter name"
              autoComplete="off"
              autoCorrect={true}
              disabled={confirmInProgress}
              spellCheck={true}
              inputMode="verbatim"
              ref={node => {this.labelInput = node;}}
              maxLength={35}
              {...label}/>
          </div>
          <div className="form-row">
            <button
              type="button"
              onClick={onClickCancelBtn}
              className="btn btn-line createCategoryModal-cancelBtn"
              disabled={confirmInProgress}
              onMouseDown={this.mouseDownCancel}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-info createCategoryModal-confirmBtn"
              disabled={confirmInProgress || treatFormInvalid}>
              {confirmText}
            </button>
          </div>
        </form>
      </div>
    );
  }
});

export {ModifyCategoryModal};

function validate(values, props) {
  const newLabel = _.result(values.label, 'trim');

  const errors = {};

  const duplicate = _.find(props.categories, c => {
    // A label cannot be a duplicate of itself!
    if (c.id === _.result(props.category, 'id')) {
      return;
    }
    return c.label.toLowerCase() === _.result(newLabel, 'toLowerCase');
  });

  // Prevent empty labels
  if (!newLabel) {
    errors.label = 'empty';
  }

  // Catch duplicates
  else if (duplicate) {
    errors.label = 'duplicate';
  }

  return errors;
}

export default reduxForm(
  {
    form: 'createCategory',
    fields: ['label'],
    validate
  }
)(ModifyCategoryModal);
