import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as alertActionCreators from '../../../redux/alert/action-creators';
import * as categoriesActionCreators from '../../../redux/categories/action-creators';
import CategoriesList from '../categories-list';
import LoadingCategories from '../loading-categories';
import EmptyCategories from '../empty-categories';
import ErrorRetrieving from '../error-retrieving';

export const Categories = React.createClass({
  componentDidMount() {
    const {categoriesActions} = this.props;
    categoriesActions.retrieveCategories();
  },

  render() {
    const {
      retrievingCategories, categories, updateCategorySuccess,
      categoriesActions, currentlyDeleting, isOnline,
      deleteCategorySuccess, alertActions, updatingCategory,
      retrieveCategoriesFailure, updateCategoryFailure,
      deleteCategoryFailure
    } = this.props;

    if (retrievingCategories) {
      return <LoadingCategories/>;
    }

    if (retrieveCategoriesFailure) {
      return <ErrorRetrieving retry={categoriesActions.retrieveCategories}/>;
    }

    if (!categories.length) {
      return <EmptyCategories/>;
    }

    return (<CategoriesList
      isOnline={isOnline}
      currentlyDeleting={currentlyDeleting}
      updatingCategory={updatingCategory}
      categories={categories}
      deleteCategorySuccess={deleteCategorySuccess}
      deleteCategoryFailure={deleteCategoryFailure}
      updateCategorySuccess={updateCategorySuccess}
      updateCategoryFailure={updateCategoryFailure}
      categoriesActions={categoriesActions}
      alertActions={alertActions}/>);
  }
});

function mapStateToProps(state) {
  return {
    isOnline: state.connection,
    categories: state.categories.categories,
    currentlyDeleting: state.categories.currentlyDeleting,
    deleteCategorySuccess: state.categories.deleteCategorySuccess,
    deleteCategoryFailure: state.categories.deleteCategoryFailure,
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
