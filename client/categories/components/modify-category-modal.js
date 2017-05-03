import _ from 'lodash';
import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import classNames from 'classnames';
import validateEmoji from '../../common/utils/validate-emoji';

export class ModifyCategoryModal extends Component {
  render() {
    const {
      fields: {label, emoji},
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
    const emojiIsInvalid = emoji.error && emoji.touched;
    const treatFormInvalid = (emojiIsInvalid || labelIsInvalid) && !this.state.cancelBegun;

    const labelClass = classNames({
      'text-input': true,
      newCategoryName: true,
      'invalid-input': treatFormInvalid
    });

    const modalTitle = isEditMode ? 'Edit category' : 'Create new category';

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
    } else if (treatFormInvalid && emoji.error === 'invalid') {
      errorMsg = 'Invalid emoji entered';
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
        <form
          onSubmit={onFormSubmit}
          id="modify-category-modal-form"
          className="modal-body">
          {errorEl}
          <div className="form-row">
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
            <input
              type="text"
              className="text-input"
              placeholder="Enter emoji"
              autoComplete="off"
              autoCorrect={true}
              disabled={confirmInProgress}
              spellCheck={true}
              inputMode="verbatim"
              maxLength={35}
              {...emoji}/>
          </div>
        </form>
        <div className="modal-footer">
          <button
            type="button"
            onClick={onClickCancelBtn}
            className="btn btn-secondary createCategoryModal-cancelBtn"
            disabled={confirmInProgress}
            onMouseDown={this.mouseDownCancel}>
            Cancel
          </button>
          <button
            form="modify-category-modal-form"
            type="submit"
            className="btn createCategoryModal-confirmBtn"
            disabled={confirmInProgress || treatFormInvalid}>
            {confirmText}
          </button>
        </div>
      </div>
    );
  }

  state = {
    cancelBegun: false
  }

  componentDidMount = () => {
    this.labelInput.focus();
  }

  mouseDownCancel = () => {
    const {
      fields: {label, emoji}
    } = this.props;

    const labelIsInvalid = label.error && label.touched;
    const emojiIsInvalid = emoji.error && emoji.touched;
    const formIsInvalid = labelIsInvalid || emojiIsInvalid;

    // redux-form is quick to the draw on making the form invalid. In fact,
    // it happens so fast that simply mousing down on the cancel can cause
    // the error message to appear. The error message physically moves the
    // cancel button, making the click miss the button entirely. Not good. This
    // callback is called before that ever happens, so we set some state to let
    // redux-form know to wait a second if the form isn't already invalid.
    // If, on the other hand, it's already invalid, then we don't need to do
    // this check at all.
    if (!formIsInvalid) {
      this.setState({
        cancelBegun: true
      });
    }
  }

  mouseUpOnComponent = () => {
    this.setState({
      cancelBegun: false
    });
  }
}

function validate(values, props) {
  const newLabel = _.result(String(values.label), 'trim');
  const newEmoji = _.result(String(values.emoji), 'trim');

  const errors = {};

  const duplicate = _.find(props.categories, c => {
    // A label cannot be a duplicate of itself!
    if (c.id === _.result(props.category, 'id')) {
      return;
    }
    return c.attributes.label.toLowerCase() === _.result(newLabel, 'toLowerCase');
  });

  // Prevent empty labels
  if (!newLabel) {
    errors.label = 'empty';
  }

  // Catch duplicates
  else if (duplicate) {
    errors.label = 'duplicate';
  }

  if (newEmoji && !validateEmoji(newEmoji)) {
    errors.emoji = 'invalid';
  }

  return errors;
}

const reduxFormOptions = {
  form: 'createCategory',
  fields: ['label', 'emoji'],
  validate
};

function reduxFormInitialState(state, nextProps) {
  return {
    initialValues: _.get(nextProps.category, 'attributes')
  };
}

export default reduxForm(reduxFormOptions, reduxFormInitialState)(ModifyCategoryModal);
