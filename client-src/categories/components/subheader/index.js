import _ from 'lodash';
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Modal from '../../../common/components/modal';
import ModifyCategoryModal from '../modify-category-modal';
import * as categoriesActionCreators from '../../../redux/categories/action-creators';
import * as alertActionCreators from '../../../redux/alert/action-creators';

const CategoriesSubheader = React.createClass({
  getInitialState() {
    return {
      isModalOpen: false
    };
  },

  onClickNew() {
    this.setState({
      isModalOpen: true
    });
  },

  onClickModalCancel() {
    this.setState({
      isModalOpen: false
    });
  },

  onClickModalCreate(fields) {
    const newCategory = _.defaults(fields, {
      emoji: null,
      label: ''
    });
    newCategory.label = newCategory.label.trim();
    this.props.categoriesActions.createCategory(newCategory);
  },

  createModal() {
    const childrenProps = {
      onClickCancel: this.onClickModalCancel,
      onSubmit: this.onClickModalCreate,
      categories: this.props.categories,
      confirmInProgress: this.props.creatingCategory,
      actionFailure: this.props.createCategoryFailure,
      dismissError: this.props.categoriesActions.dismissCreateCategoryFailureAlert,
      isEditMode: false
    };

    const modalProps = {
      children: (<ModifyCategoryModal {...childrenProps}/>),
      modalClassName: 'create-category-modal-container'
    };

    return (<Modal {...modalProps}/>);
  },

  componentWillReceiveProps(nextProps) {
    // If we weren't previously trying to create a category,
    // then there's nothing for us to check.
    if (!this.props.creatingCategory) {
      return false;
    }

    // If the creation was successful, then we can close the
    // modal.
    if (nextProps.createCategorySuccess) {
      this.setState({
        isModalOpen: false
      });

      this.props.alertActions.queueAlert({
        text: 'Category created',
        style: 'success',
        isDismissable: true,
        persistent: false
      });
    }
  },

  render() {
    const {isOnline} = this.props;

    const disabled = !isOnline;

    const modal = this.state.isModalOpen ? this.createModal() : null;

    return (
      <div className="sub-header">
        {modal}
        <div className="container">
          <h1 className="subheader-title">
            Categories
          </h1>
          <button
            className="subheader-action btn"
            onClick={this.onClickNew}
            disabled={disabled}>
            + Category
          </button>
        </div>
      </div>
    );
  }
});

export {CategoriesSubheader};

function mapStateToProps(state) {
  return {
    isOnline: state.connection,
    categories: state.categories.categories,
    creatingCategory: state.categories.creatingCategory,
    createCategorySuccess: state.categories.createCategorySuccess,
    createCategoryFailure: state.categories.createCategoryFailure
  };
}

function mapDispatchToProps(dispatch) {
  return {
    categoriesActions: bindActionCreators(categoriesActionCreators, dispatch),
    alertActions: bindActionCreators(alertActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesSubheader);
