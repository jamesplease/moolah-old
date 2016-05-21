import React from 'react';
import CategoryListItem from '../category-list-item';

export default function CategoriesList({categories, categoriesActions, currentlyDeleting}) {
  return (
    <ul className="categories-list resource-list">
      {categories.map(category => (
        <CategoryListItem
          category={category}
          key={category.id}
          categoriesActions={categoriesActions}
          currentlyDeleting={currentlyDeleting}/>
      ))}
    </ul>
  );
}
