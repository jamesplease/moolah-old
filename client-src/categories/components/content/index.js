import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as alertActionCreators from '../../../redux/alert/action-creators';
import * as categoriesActionCreators from '../../../redux/categories/action-creators';
import CategoriesList from '../categories-list';
import LoadingPage from '../../../common/components/loading-page';
import EmptyCategories from '../empty-categories';

export const Categories = React.createClass({
  componentDidMount() {
    const {categoriesActions} = this.props;
    categoriesActions.retrieveCategories();
  },

  render() {
    const {
      retrievingCategories, categories, updateCategorySuccess,
      categoriesActions, currentlyDeleting, isOnline,
      deleteCategorySuccess, alertActions, updatingCategory
    } = this.props;

    if (retrievingCategories) {
      return <LoadingPage/>;
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
      updateCategorySuccess={updateCategorySuccess}
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
    retrievingCategories: state.categories.retrievingCategories,
    updatingCategory: state.categories.updatingCategory,
    updateCategorySuccess: state.categories.updateCategorySuccess
  };
}

function mapDispatchToProps(dispatch) {
  return {
    categoriesActions: bindActionCreators(categoriesActionCreators, dispatch),
    alertActions: bindActionCreators(alertActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
