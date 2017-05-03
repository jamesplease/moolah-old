import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import classNames from 'classnames';
import validateTransactionDate from '../utils/validate-transaction-date';

export class ModifyTransactionModal extends Component {
  render() {
    const {
      fields: {description, value, date, category},
      handleSubmit,
      confirmInProgress,
      onClickCancel,
      isEditMode,
      categories
    } = this.props;

    function onClickCancelBtn(e) {
      e.preventDefault();
      onClickCancel();
    }

    function onFormSubmit(e) {
      e.preventDefault();
      handleSubmit();
    }

    // Case-insensitive sort by the category's label
    const sortedCategories = _.sortBy(categories, c => c.attributes.label.toLowerCase());

    const descriptionIsInvalid = description.error && description.touched;
    const valueIsInvalid = value.error && value.touched;
    const dateIsInvalid = date.error && date.touched;
    const invalidField = descriptionIsInvalid || valueIsInvalid || dateIsInvalid;
    const treatFormInvalid = invalidField && !this.state.cancelBegun;

    const labelClass = classNames({
      'text-input': true,
      newTransactionName: true,
      'invalid-input': treatFormInvalid
    });

    const modalTitle = isEditMode ? 'Edit transaction' : 'Create new transaction';

    let confirmText;
    if (isEditMode) {
      confirmText = confirmInProgress ? 'Editing...' : 'Edit';
    } else {
      confirmText = confirmInProgress ? 'Creating...' : 'Create';
    }

    let errorMsg;
    if (treatFormInvalid && description.error === 'empty') {
      errorMsg = 'A description is required';
    } else if (treatFormInvalid && value.error === 'empty') {
      errorMsg = 'A value is required';
    } else if (treatFormInvalid && date.error === 'empty') {
      errorMsg = 'A date is required';
    } else if (treatFormInvalid && date.error === 'invalid') {
      errorMsg = 'An invalid date was entered';
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
      createTransactionModal: true,
      'modal-form-invalid': treatFormInvalid
    });

    return (
      <div className={modalClass} onMouseUp={this.mouseUpOnComponent}>
        <h1 className="modal-title">
          {modalTitle}
        </h1>
        <form
          onSubmit={onFormSubmit}
          id="modify-transaction-modal-form"
          className="modal-body">
          {errorEl}
          <div className="form-row">
            <label className="form-label">Description</label>
            <input
              type="text"
              className={labelClass}
              autoComplete="off"
              autoCorrect={true}
              disabled={confirmInProgress}
              spellCheck={true}
              inputMode="verbatim"
              ref={node => {this.descriptionInput = node;}}
              maxLength={35}
              {...description}/>
          </div>
          <div className="form-row">
            <label className="form-label">Value</label>
            <input
              type="text"
              className="text-input"
              placeholder="0.00"
              autoComplete="off"
              autoCorrect={true}
              disabled={confirmInProgress}
              spellCheck={true}
              inputMode="verbatim"
              maxLength={35}
              {...value}/>
          </div>
          <div className="form-row">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="text-input"
              placeholder="04/10/2017"
              autoComplete="off"
              autoCorrect={true}
              disabled={confirmInProgress}
              spellCheck={true}
              inputMode="verbatim"
              maxLength={35}
              {...date}/>
          </div>
          <div className="form-row">
            <label className="form-label">Category</label>
            <select {...category} value={category.value || ''}>
              <option value="">
                Select a category...
              </option>
              {_.map(sortedCategories, category => (
                <option value={category.id}>
                  {category.attributes.label}
                </option>
              ))}
            </select>
          </div>
        </form>
        <div className="modal-footer">
          <button
            type="button"
            onClick={onClickCancelBtn}
            className="btn btn-secondary createTransactionModal-cancelBtn"
            disabled={confirmInProgress}
            onMouseDown={this.mouseDownCancel}>
            Cancel
          </button>
          <button
            form="modify-transaction-modal-form"
            type="submit"
            className="btn createTransactionModal-confirmBtn"
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
    this.descriptionInput.focus();
  }

  mouseDownCancel = () => {
    const {
      fields: {description, value, date}
    } = this.props;

    const descriptionIsInvalid = description.error && description.touched;
    const valueIsInvalid = value.error && value.touched;
    const dateIsInvalid = date.error && date.touched;
    const formIsInvalid = descriptionIsInvalid || valueIsInvalid || dateIsInvalid;

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

function mapStateToProps(state) {
  return {
    categories: state.categories.resources
  };
}

const ConnectedModifyTransactionModal = connect(mapStateToProps)(ModifyTransactionModal);

function validate(values) {
  // Sometimes, redux-form converts values into a number...
  const newDescription = _.result(String(values.description), 'trim');
  const newValue = _.result(String(values.value), 'trim');
  const newDate = _.result(String(values.date), 'trim');

  const errors = {};

  // Prevent empty labels
  if (!newDescription) {
    errors.description = 'empty';
  }

  if (!newValue) {
    errors.value = 'empty';
  }

  if (!newDate) {
    errors.date = 'empty';
  } else if (!validateTransactionDate(newDate, {includeDay: true})) {
    errors.date = 'invalid';
  }

  return errors;
}

const reduxFormOptions = {
  form: 'createTransaction',
  fields: ['description', 'value', 'date', 'category'],
  validate
};

function reduxFormInitialState(state, nextProps) {
  let initialValues = _.get(nextProps.transaction, 'attributes', {});
  // We also grab the relationship information for this transaction
  initialValues.category = _.get(nextProps.transaction, 'relationships.category.data.id');
  return {initialValues};
}

export default reduxForm(reduxFormOptions, reduxFormInitialState)(ConnectedModifyTransactionModal);
