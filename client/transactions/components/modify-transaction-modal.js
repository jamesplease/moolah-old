import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import classNames from 'classnames';
import transactionValidator from '../services/transaction-validator';

export class ModifyTransactionModal extends Component {
  render() {
    const {
      fields,
      handleSubmit,
      confirmInProgress,
      onClickCancel,
      isEditMode,
      categories
    } = this.props;
    const {description, value, date, category} = fields;

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

    const isFormInvalid = this.isFormInvalid();

    const labelClass = classNames({
      'text-input': true,
      newTransactionName: true,
      'invalid-input': isFormInvalid
    });

    const modalTitle = isEditMode ? 'Edit transaction' : 'Create new transaction';

    let confirmText;
    if (isEditMode) {
      confirmText = confirmInProgress ? 'Editing...' : 'Edit';
    } else {
      confirmText = confirmInProgress ? 'Creating...' : 'Create';
    }

    let errorMsg;
    if (isFormInvalid && description.error) {
      errorMsg = description.error;
    } else if (isFormInvalid && value.error) {
      errorMsg = value.error;
    } else if (isFormInvalid && date.error) {
      errorMsg = date.error;
    }

    let errorEl;
    if (isFormInvalid) {
      errorEl = (
        <div className="modal-error form-error">
          {errorMsg}
        </div>
      );
    }

    const modalClass = classNames({
      createTransactionModal: true,
      'modal-form-invalid': isFormInvalid
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
            <input
              type="text"
              className={labelClass}
              placeholder="Description"
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
            <input
              type="text"
              className="text-input"
              placeholder="Value"
              autoComplete="off"
              autoCorrect={true}
              disabled={confirmInProgress}
              spellCheck={true}
              inputMode="verbatim"
              maxLength={35}
              {...value}/>
          </div>
          <div className="form-row">
            <input
              type="date"
              className="text-input"
              placeholder="Date"
              autoComplete="off"
              autoCorrect={true}
              disabled={confirmInProgress}
              spellCheck={true}
              inputMode="verbatim"
              maxLength={35}
              {...date}/>
          </div>
          <div className="form-row">
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
            className="btn btn-info createTransactionModal-confirmBtn"
            disabled={confirmInProgress || isFormInvalid}>
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
    const isFormInvalid = this.isFormInvalid();

    // redux-form is quick to the draw on making the form invalid. In fact,
    // it happens so fast that simply mousing down on the cancel can cause
    // the error message to appear. The error message physically moves the
    // cancel button, making the click miss the button entirely. Not good. This
    // callback is called before that ever happens, so we set some state to let
    // redux-form know to wait a second if the form isn't already invalid.
    // If, on the other hand, it's already invalid, then we don't need to do
    // this check at all.
    if (!isFormInvalid) {
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

  isFormInvalid = () => {
    const {fields} = this.props;
    const {cancelBegun} = this.state;

    const formTouched = !_.every(fields, {touched: false});
    const invalidField = formTouched && _.find(fields, 'error');
    return invalidField && !cancelBegun;
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.resources
  };
}

const ConnectedModifyTransactionModal = connect(mapStateToProps, null, null, {pure: false})(ModifyTransactionModal);

function validate(values) {
  // Sometimes, redux-form converts values into a number...
  const description = _.result(String(values.description), 'trim');
  const date = _.result(String(values.date), 'trim');

  const result = transactionValidator({
    ...values,
    description, date
  });

  return result;
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
