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
      creatingCategory,
      onClickCancel
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

    return (
      <div className="create-category-modal">
        <h1 className="modal-title">
          New Category
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
              autocomplete={false}
              autocorrect={true}
              ref="labelInput"
              {...label}/>
          </div>
          <div className="form-row">
            <button
              type="button"
              onClick={onClickCancelBtn}
              className="btn btn-line create-category-modal-cancel"
              disabled={creatingCategory}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn create-category-modal-confirm"
              disabled={creatingCategory}>
              Create
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
  if (!values.label) {
    errors.label = true;
  }
  return errors;
}

export default reduxForm({
  form: 'createCategory',
  fields: ['label'],
  validate
})(CreateCategoriesModal);
