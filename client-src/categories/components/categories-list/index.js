import React from 'react';
import CategoryListItem from '../category-list-item';

export default function CategoriesList(props) {
  const {
    categories, categoriesActions, alertActions,
    currentlyDeleting, isOnline
  } = props;

  return (
    <ul className="categories-list resource-list">
      {categories.map(category => (
        <CategoryListItem
          isOnline={isOnline}
          category={category}
          key={category.id}
          alertActions={alertActions}
          categoriesActions={categoriesActions}
          currentlyDeleting={currentlyDeleting}/>
      ))}
    </ul>
  );
}
