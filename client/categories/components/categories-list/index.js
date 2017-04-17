import _ from 'lodash';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from '../../../vendor/css-transition-group';
import CategoryListItem from '../category-list-item';
import Modal from '../../../common/components/modal';
import ModifyCategoryModal from '../modify-category-modal';
import DeleteCategoryModal from '../delete-category-modal';
import * as categoriesActionCreators from '../../../state/categories/action-creators';

export class CategoriesList extends Component {
  render() {
    const {
      categories, isOnline
    } = this.props;

    const deleteModal = this.state.categoryToDelete ? this.getDeleteModal() : null;
    const editModal = this.state.categoryToUpdate ? this.getEditModal() : null;

    // Case-insensitive sort by the category's label
    const sortedCategories = _.sortBy(categories, c => c.attributes.label.toLowerCase());

    const transitionGroupProps = {
      transitionName: 'resourceListItem',
      transitionEnterTimeout: 250,
      transitionLeaveTimeout: 250,
      component: 'ul',
      className: 'resourceList'
    };

    return (
      <div className="categoriesList resourceListContainer">
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

  constructor(props) {
    super(props);
    this.state = {
      categoryToDelete: null,
      categoryToUpdate: null
    };
  }

  onClickDelete = (category) => {
    this.setState({
      categoryToDelete: category
    });
  }

  onClickEdit = (category) => {
    this.setState({
      categoryToUpdate: category
    });
  }

  // We can use one method to close both modals, since the
  // modals will never be open at the same time.
  onClickModalCancel = () => {
    this.setState({
      categoryToDelete: null,
      categoryToUpdate: null
    });
  }

  onConfirmDeleteModal = () => {
    const {deleteCategory} = this.props;
    const category = this.state.categoryToDelete;
    deleteCategory(category.id);
  }

  onConfirmEditModal = (fields) => {
    const {updateCategory} = this.props;
    const categoryId = this.state.categoryToUpdate.id;
    updateCategory({
      id: categoryId,
      attributes: {...fields}
    });
  }

  getDeleteModal = () => {
    const {categoriesMeta} = this.props;

    const categoryId = this.state.categoryToDelete.id;
    const categoryBeingDeletedMeta = _.find(categoriesMeta, {id: categoryId});
    const isDeletingCategory = categoryBeingDeletedMeta.isDeleting;

    const childrenProps = {
      onClickCancel: this.onClickModalCancel,
      onClickDelete: this.onConfirmDeleteModal,
      category: this.state.categoryToDelete,
      deletingCategory: isDeletingCategory
    };

    return (
      <Modal modalClassName="deleteCategoryModal-container">
        <DeleteCategoryModal {...childrenProps}/>
      </Modal>
    );
  }

  getEditModal = () => {
    const {categoriesMeta} = this.props;

    const categoryId = this.state.categoryToUpdate.id;
    const categoryBeingUpdatedMeta = _.find(categoriesMeta, {id: categoryId});
    const isUpdating = categoryBeingUpdatedMeta.updatingStatus === 'PENDING';

    const childrenProps = {
      categories: this.props.categories,
      onClickCancel: this.onClickModalCancel,
      onSubmit: this.onConfirmEditModal,
      category: this.state.categoryToUpdate,
      confirmInProgress: isUpdating,
      initialValues: this.state.categoryToUpdate,
      isEditMode: true
    };

    return (
      <Modal modalClassName="modifyCategoryModal-container">
        <ModifyCategoryModal {...childrenProps}/>
      </Modal>
    );
  }

  checkForSuccessfulDelete = (nextProps) => {
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
  }

  checkForSuccessfulUpdate(nextProps) {
    // If the modal isn't open, then there's nothing to check
    if (!this.state.categoryToUpdate) {
      return;
    }

    const {categoriesMeta} = nextProps;
    const {id} = this.state.categoryToUpdate;
    const updatingCategoryMeta = _.find(categoriesMeta, {id});

    if (updatingCategoryMeta.updatingStatus === 'SUCCESS') {
      this.setState({
        categoryToUpdate: null
      });

      this.props.resetUpdateCategoryResolution({
        categoryId: id
      });
    }
  }

  // We check to see if there was a successful delete by comparing props.
  // If there was, then we close the modal.
  componentWillReceiveProps(nextProps) {
    this.checkForSuccessfulDelete(nextProps);
    this.checkForSuccessfulUpdate(nextProps);
  }
}

function mapStateToProps(state) {
  return {
    isOnline: state.connection,
    categories: state.categories.categories,
    categoriesMeta: state.categories.categoriesMeta
  };
}

function mapDispatchToProps(dispatch) {
  const {
    deleteCategory, updateCategory, resetUpdateCategoryResolution
  } = categoriesActionCreators;

  return bindActionCreators({
    deleteCategory, updateCategory, resetUpdateCategoryResolution
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
