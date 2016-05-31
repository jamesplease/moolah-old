import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import {reduxForm} from 'redux-form';
import classNames from 'classnames';

const CreateCategoriesModal = React.createClass({
  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.labelInput).focus();
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
    // the error message to appear. This pushes down the cancel button,
    // making it override your intention. Not good. This callback is called
    // before that ever happens, so we set some state to let redux-form
    // know to wait a second if the form isn't already invalid.
    // If it is invalid, then in a similar way we don't want the mouse down
    // to affect the state at all.
    if (!labelIsInvalid) {
      this.setState({
        cancelBegun: true
      });
    }
  },

  mouseUpOnComponent() {
    this.setState({
      cancelBegun: false
    })
  },

  componentWillReceiveProps(nextProps) {
    const nextLabel = nextProps.fields.label;
    const thisLabel = this.props.fields.label;

    const nextLabelIsInvalid = nextLabel.error && nextLabel.touched;
    const thisLabelIsInvalid = thisLabel.error && thisLabel.touched;

    // If the next label is invalid, and the current label is valid, then
    // that means the form has gone from being valid to invalid. In that case,
    // we display an error message. If the user had already submitted
    // the form, then they would no longer see the "error occurred" message.
    // We want to dismiss that "error occurred" message, because if they
    // fix the form issue then it should be as if the form wasn't submitted.
    // It'd be weird if the error went BACK to the "error occurred" after
    // they corrected the issue with the form.
    if (nextLabelIsInvalid && nextLabelIsInvalid !== thisLabelIsInvalid) {
      this.props.dismissError();
    }
  },

  componentWillUnmount() {
    // When the component is removed from the DOM, we can clear out any
    // HTTP error states. This makes it so that opening the modal again doesn't
    // display the old error.
    this.props.dismissError();
  },

  render() {
    const {
      fields: {label},
      handleSubmit,
      confirmInProgress,
      onClickCancel,
      isEditMode,
      actionFailure
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
      'new-category-name': true,
      'invalid-input': treatFormInvalid
    });

    const modalTitle = isEditMode ? 'Edit Category' : 'New Category';

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
    } else if (actionFailure) {
      errorMsg = 'There was an error.';
    }

    const errorClass = classNames({
      'modal-error': true,
      'visible': treatFormInvalid || actionFailure
    });

    const modalClass = classNames({
      'create-category-modal': true,
      'modal-form-invalid': treatFormInvalid || actionFailure
    });

    return (
      <div className={modalClass} onMouseUp={this.mouseUpOnComponent}>
        <h1 className="modal-title">
          {modalTitle}
        </h1>
        <div className={errorClass}>
          {errorMsg}
        </div>
        <form onSubmit={onFormSubmit}>
          <div className="form-row">
            <div className="create-category-modal-emoji-select">
              🙃
            </div>
            <input
              type="text"
              className={labelClass}
              placeholder="Enter name"
              autoComplete="off"
              autoCorrect={true}
              spellCheck={true}
              inputMode="verbatim"
              ref="labelInput"
              maxLength={35}
              {...label}/>
          </div>
          <div className="form-row">
            <button
              type="button"
              onClick={onClickCancelBtn}
              className="btn btn-line create-category-modal-cancel"
              disabled={confirmInProgress}
              onMouseDown={this.mouseDownCancel}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-info create-category-modal-confirm"
              disabled={confirmInProgress || treatFormInvalid}>
              {confirmText}
            </button>
          </div>
        </form>
      </div>
    );
  }
});

export { CreateCategoriesModal };

function validate(values, props) {
  const newLabel = _.result(values.label, 'trim');

  const errors = {};

  const duplicate = _.find(props.categories, c => {
    // A label cannot be a duplicate of itself!
    if (c.id === props.categoryIdBeingUpdated) {
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

function mapStateToProps(state) {
  const categories = state.categories;
  const categoryIdBeingUpdated = categories.categoryIdBeingUpdated;
  if (!categoryIdBeingUpdated) {
    return;
  }

  return {
    categoryIdBeingUpdated,
    initialValues: _.find(categories.categories, {id: categoryIdBeingUpdated})
  };
}

export default reduxForm({
  form: 'createCategory',
  fields: ['label'],
  validate
}, mapStateToProps)(CreateCategoriesModal);
