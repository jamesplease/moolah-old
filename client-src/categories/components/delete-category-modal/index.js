import _ from 'lodash';
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as alertActionCreators from '../../../redux/alert/action-creators';
import * as categoriesActionCreators from '../../../redux/categories/action-creators';

const DeleteCategoryModal = React.createClass({
  componentWillUnmount() {
    this.props.dismissError();
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.actionFailure && !this.props.actionFailure) {
      const {queueAlert} = this.props.alertActions;
      const dismissFailureAlert = categoriesActionCreators.resetDeleteCategoryResolution();
      queueAlert({
        style: 'danger',
        text: 'Oops – there was an error.<br>Try that one more time?',
        isDismissable: true,
        onDismissAction: dismissFailureAlert
      });
    }
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

    const deleteBtnText = props.deletingCategory ? 'Deleting...' : 'Delete';

    return (
      <div className="delete-category-modal">
        <h1 className="modal-title">
          Delete "{props.category.label}"?
        </h1>
        <div className="form-row">
          <button
            onClick={onClickCancelBtn}
            className="btn btn-line delete-category-modal-cancel"
            disabled={props.deletingCategory}>
            Cancel
          </button>
          <button
            onClick={onClickDeleteBtn}
            className="btn btn-danger delete-category-modal-confirm"
            disabled={props.deletingCategory}>
            {deleteBtnText}
          </button>
        </div>
      </div>
    );
  }
});

export {DeleteCategoryModal};

function mapDispatchToProps(dispatch) {
  return {
    categoriesActions: bindActionCreators(categoriesActionCreators, dispatch),
    alertActions: bindActionCreators(alertActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(DeleteCategoryModal);
