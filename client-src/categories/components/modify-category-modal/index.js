import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import {reduxForm} from 'redux-form';
import classNames from 'classnames';

const CreateCategoriesModal = React.createClass({
  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.labelInput).focus();
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

    const labelClass = classNames({
      'text-input': true,
      'new-category-name': true,
      'invalid-input': label.error && label.touched
    });

    const modalTitle = isEditMode ? 'Edit Category' : 'New Category';

    let confirmText;
    if (isEditMode) {
      confirmText = confirmInProgress ? 'Editing...' : 'Edit';
    } else {
      confirmText = confirmInProgress ? 'Creating...' : 'Create';
    }

    return (
      <div className="create-category-modal">
        <h1 className="modal-title">
          {modalTitle}
        </h1>
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
              disabled={confirmInProgress}>
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
    errors.label = true;
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
