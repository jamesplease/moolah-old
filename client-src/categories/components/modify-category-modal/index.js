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

    const labelClass = classNames({
      'text-input': true,
      'new-category-name': true,
      'invalid-input': labelIsInvalid && !this.state.cancelBegun
    });

    const modalTitle = isEditMode ? 'Edit Category' : 'New Category';

    let confirmText;
    if (isEditMode) {
      confirmText = confirmInProgress ? 'Editing...' : 'Edit';
    } else {
      confirmText = confirmInProgress ? 'Creating...' : 'Create';
    }

    let errorMsg;
    if (labelIsInvalid && label.error === 'empty' && !this.state.cancelBegun) {
      errorMsg = 'A name is required';
    }

    const errorClass = classNames({
      'modal-error': true,
      'visible': labelIsInvalid && !this.state.cancelBegun
    });

    const modalClass = classNames({
      'create-category-modal': true,
      'modal-form-invalid': labelIsInvalid && !this.state.cancelBegun
    })

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
              disabled={confirmInProgress}>
              {confirmText}
            </button>
          </div>
        </form>
      </div>
    );
  }
});

export { CreateCategoriesModal };

const validate = values => {
  const errors = {}
  if (!values.label || !values.label.trim()) {
    errors.label = 'empty';
  }
  return errors;
}

function mapStateToFormProps(state) {
  const categories = state.categories;
  const categoryIdBeingUpdated = categories.categoryIdBeingUpdated;
  if (!categoryIdBeingUpdated) {
    return;
  }

  return {
    initialValues: _.find(categories.categories, {id: categoryIdBeingUpdated})
  };
}

export default reduxForm({
  form: 'createCategory',
  fields: ['label'],
  validate
}, mapStateToFormProps)(CreateCategoriesModal);
