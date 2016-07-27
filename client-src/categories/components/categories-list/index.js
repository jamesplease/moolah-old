import _ from 'lodash';
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from '../../../vendor/css-transition-group';
import CategoryListItem from '../category-list-item';
import Modal from '../../../common/components/modal';
import ModifyCategoryModal from '../modify-category-modal';
import DeleteCategoryModal from '../delete-category-modal';
import * as alertActionCreators from '../../../redux/alerts/action-creators';
import * as categoriesActionCreators from '../../../redux/categories/action-creators';

const CategoriesList = React.createClass({
  getInitialState() {
    return {
      categoryToDelete: null,
      isUpdateModalOpen: false,
      categoryToUpdate: null
    };
  },

  onClickDelete(category) {
    this.setState({
      categoryToDelete: category
    });
  },

  onClickEdit(category) {
    this.props.categoriesActions.setCategoryUpdateId(category.id);

    this.setState({
      isUpdateModalOpen: true,
      categoryToUpdate: category
    });
  },

  // We can use one method to close both modals, since the
  // modals will never be open at the same time.
  onCancelModel() {
    this.props.categoriesActions.clearCategoryUpdateId();
    this.setState({
      categoryToDelete: null,
      isUpdateModalOpen: false,
      categoryToUpdate: null
    });
  },

  onConfirmDeleteModal() {
    const {categoriesActions} = this.props;
    const category = this.state.categoryToDelete;
    categoriesActions.deleteCategory(category.id);
  },

  onConfirmEditModal(fields) {
    const {categoriesActions} = this.props;
    const categoryId = this.state.categoryToUpdate.id;
    categoriesActions.updateCategory({
      id: categoryId,
      ...fields
    });
  },

  getDeleteModal() {
    const {categoriesMeta} = this.props;

    const categoryId = this.state.categoryToDelete.id;
    const categoryBeingDeletedMeta = _.find(categoriesMeta, {id: categoryId});
    const isDeletingCategory = categoryBeingDeletedMeta.isDeleting;

    const childrenProps = {
      onClickCancel: this.onCancelModel,
      onClickDelete: this.onConfirmDeleteModal,
      category: this.state.categoryToDelete,
      deletingCategory: isDeletingCategory
    };

    return (
      <Modal modalClassName="delete-category-modal-container">
        <DeleteCategoryModal {...childrenProps}/>
      </Modal>
    );
  },

  getEditModal() {
    const childrenProps = {
      categories: this.props.categories,
      onClickCancel: this.onCancelModel,
      onSubmit: this.onConfirmEditModal,
      category: this.state.categoryToUpdate,
      actionFailure: this.props.updateCategoryFailure,
      dismissError: this.props.categoriesActions.resetUpdateCategoryResolution,
      confirmInProgress: this.props.updatingCategory,
      isEditMode: true
    };

    const modalProps = {
      children: (<ModifyCategoryModal {...childrenProps}/>),
      modalClassName: 'create-category-modal-container'
    };

    return (<Modal {...modalProps}/>);
  },

  checkForSuccessfulDelete(nextProps) {
    // If the modal isn't open, then there's nothing to check
    if (!this.state.categoryToDelete) {
      return;
    }

    const {categories} = nextProps;
    const {id} = this.state.categoryToDelete;

    // If the category no longer exists, then it has been deleted
    if (!_.find(categories, {id})) {
      this.setState({
        categoryToDelete: null
      });
    }
  },

  checkForSuccessfulUpdate(nextProps) {
    // If the modal isn't open, then there's nothing to check
    if (!this.state.isUpdateModalOpen) {
      return;
    }

    const wasUpdating = this.props.updatingCategory;
    const successfulUpdate = nextProps.updateCategorySuccess;

    // If we were updating, and the update is successful, then we can
    // close the modal and queue an alert.
    if (wasUpdating && successfulUpdate) {
      this.props.categoriesActions.clearCategoryUpdateId();

      this.setState({
        isUpdateModalOpen: false,
        categoryToUpdate: null
      });

      this.props.alertActions.queueAlert({
        text: 'Category updated',
        style: 'success',
        isDismissable: true,
        persistent: false
      });
    }
  },

  // We check to see if there was a successful delete by comparing props.
  // If there was, then we close the modal.
  componentWillReceiveProps(nextProps) {
    this.checkForSuccessfulDelete(nextProps);
    this.checkForSuccessfulUpdate(nextProps);
  },

  render() {
    const {
      categories, isOnline
    } = this.props;

    const deleteModal = this.state.categoryToDelete ? this.getDeleteModal() : null;
    const editModal = this.state.isUpdateModalOpen ? this.getEditModal() : null;

    // Case-insensitive sort by the category's label
    const sortedCategories = _.sortBy(categories, c => c.label.toLowerCase());

    const transitionGroupProps = {
      transitionName: 'resource-list-item',
      transitionEnterTimeout: 250,
      transitionLeaveTimeout: 250,
      component: 'ul',
      className: 'resource-list'
    };

    return (
      <div className="categories-list resource-list-container">
        {editModal}
        {deleteModal}
        <ReactCSSTransitionGroup {...transitionGroupProps}>
          {sortedCategories.map(category => (
            <CategoryListItem
              isOnline={isOnline}
              category={category}
              key={category.id}
              onClickEdit={this.onClickEdit}
              onClickDelete={this.onClickDelete}/>
          ))}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

export {CategoriesList};

function mapStateToProps(state) {
  return {
    isOnline: state.connection,
    categories: state.categories.categories,
    categoriesMeta: state.categories.categoriesMeta,
    retrievingCategories: state.categories.retrievingCategories,
    updatingCategory: state.categories.updatingCategory,
    updateCategorySuccess: state.categories.updateCategorySuccess,
    retrieveCategoriesFailure: state.categories.retrieveCategoriesFailure,
    updateCategoryFailure: state.categories.updateCategoryFailure
  };
}

function mapDispatchToProps(dispatch) {
  return {
    categoriesActions: bindActionCreators(categoriesActionCreators, dispatch),
    alertActions: bindActionCreators(alertActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
