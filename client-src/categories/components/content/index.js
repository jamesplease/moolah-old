import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as alertActionCreators from '../../../redux/alert/action-creators';
import * as categoriesActionCreators from '../../../redux/categories/action-creators';
import Subheader from '../subheader';
import CategoriesList from '../categories-list';
import EmptyCategories from '../empty-categories';
import ErrorRetrieving from '../../../common/components/error-retrieving';
import LoadingResourceList from '../../../common/components/loading-resource-list';

export const Categories = React.createClass({
  componentDidMount() {
    const {categoriesActions} = this.props;
    categoriesActions.retrieveCategories();
  },

  getContents() {
    const {
      retrievingCategories, categories, updateCategorySuccess,
      categoriesActions, deletingCategory, isOnline,
      deleteCategorySuccess, alertActions, updatingCategory,
      retrieveCategoriesFailure, updateCategoryFailure,
      deleteCategoryFailure
    } = this.props;

    if (retrievingCategories) {
      return <LoadingResourceList/>;
    }

    if (retrieveCategoriesFailure) {
      return (<ErrorRetrieving
        retry={categoriesActions.retrieveCategories}
        resourceName="Categories"/>);
    }

    if (!categories.length) {
      return <EmptyCategories/>;
    }

    return (<CategoriesList
      isOnline={isOnline}
      deletingCategory={deletingCategory}
      updatingCategory={updatingCategory}
      categories={categories}
      deleteCategorySuccess={deleteCategorySuccess}
      deleteCategoryFailure={deleteCategoryFailure}
      updateCategorySuccess={updateCategorySuccess}
      updateCategoryFailure={updateCategoryFailure}
      categoriesActions={categoriesActions}
      alertActions={alertActions}/>);
  },

  render() {
    return (
      <div>
        <Subheader/>
        {this.getContents()}
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    isOnline: state.connection,
    categories: state.categories.categories,
    deletingCategory: state.categories.deletingCategory,
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
