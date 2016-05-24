import React from 'react';
import CategoryListItem from '../category-list-item';
import Modal from '../../../common/components/modal';
import DeleteCategoryModal from '../delete-category-modal';

const CategoriesList = React.createClass({
  getInitialState() {
    return {
      isModalOpen: false,
      categoryToDelete: null
    };
  },

  onClickDelete(category) {
    this.setState({
      isModalOpen: true,
      categoryToDelete: category
    });
  },

  onClickModalCancel() {
    this.setState({
      isModalOpen: false,
      categoryToDelete: null
    });
  },

  onClickModalDelete() {
    console.log('deleting', this.state.categoryToDelete);
  },

  createModal() {
    const childrenProps = {
      onClickCancel: this.onClickModalCancel,
      onClickDelete: this.onClickModalDelete,
      category: this.state.categoryToDelete
    };

    const modalProps = {
      children: (<DeleteCategoryModal {...childrenProps}/>),
      modalClassName: 'delete-category-modal'
    };

    return (<Modal {...modalProps}/>);
  },

  render() {
    const {
      categories, currentlyDeleting, isOnline
    } = this.props;

    const modal = this.state.isModalOpen ? this.createModal() : null;

    return (
      <div className="categories-list resource-list-container">
        {modal}
        <ul className="resource-list">
          {categories.map(category => (
            <CategoryListItem
              isOnline={isOnline}
              category={category}
              key={category.id}
              onClickDelete={this.onClickDelete}
              currentlyDeleting={currentlyDeleting}/>
          ))}
        </ul>
      </div>
    );
  }
});

export default CategoriesList;
