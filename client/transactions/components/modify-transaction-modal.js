import _ from 'lodash';
import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import classNames from 'classnames';

export class ModifyTransactionModal extends Component {
  render() {
    const {
      fields: {description, value, date, category},
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

    // const labelIsInvalid = label.error && label.touched;
    // const treatFormInvalid = labelIsInvalid && !this.state.cancelBegun;
    const treatFormInvalid = false;

    const labelClass = classNames({
      'text-input': true,
      newTransactionName: true,
      // 'invalid-input': treatFormInvalid
    });

    const modalTitle = isEditMode ? 'Edit transaction' : 'Create new transaction';

    let confirmText;
    if (isEditMode) {
      confirmText = confirmInProgress ? 'Editing...' : 'Edit';
    } else {
      confirmText = confirmInProgress ? 'Creating...' : 'Create';
    }

    const modalClass = classNames({
      createTransactionModal: true,
      'modal-form-invalid': treatFormInvalid
    });

    return (
      <div className={modalClass}>
        <h1 className="modal-title">
          {modalTitle}
        </h1>
        <form
          onSubmit={onFormSubmit}
          id="modify-transaction-modal-form"
          className="modal-body">
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
              type="text"
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
            <input
              type="text"
              className="text-input"
              placeholder="Category"
              autoComplete="off"
              autoCorrect={true}
              disabled={confirmInProgress}
              spellCheck={true}
              inputMode="verbatim"
              maxLength={35}
              {...category}/>
          </div>
        </form>
        <div className="modal-footer">
          <button
            type="button"
            onClick={onClickCancelBtn}
            className="btn btn-secondary createTransactionModal-cancelBtn"
            disabled={confirmInProgress}>
            Cancel
          </button>
          <button
            form="modify-transaction-modal-form"
            type="submit"
            className="btn btn-info createTransactionModal-confirmBtn"
            disabled={confirmInProgress || treatFormInvalid}>
            {confirmText}
          </button>
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      cancelBegun: false
    };
  }

  componentDidMount = () => {
    this.descriptionInput.focus();
  }
}

function validate() {
  // Validation will come soon
  return {};
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

export default reduxForm(reduxFormOptions, reduxFormInitialState)(ModifyTransactionModal);
