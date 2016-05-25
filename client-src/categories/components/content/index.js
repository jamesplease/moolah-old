import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as alertActionCreators from '../../../redux/alert/action-creators';
import * as categoriesActionCreators from '../../../redux/categories/action-creators';
import CategoriesList from '../categories-list';
import LoadingCategories from '../loading-categories';
import EmptyCategories from '../empty-categories';

export const Categories = React.createClass({
  componentDidMount() {
    const {categoriesActions} = this.props;
    categoriesActions.retrieveCategories();
  },

  render() {
    const {
      retrievingCategories, categories,
      categoriesActions, currentlyDeleting, isOnline,
      deleteCategorySuccess, alertActions
    } = this.props;

    if (retrievingCategories) {
      return <LoadingCategories/>;
    }

    if (!categories.length) {
      return <EmptyCategories/>;
    }

    return (<CategoriesList
      isOnline={isOnline}
      categories={categories}
      deleteCategorySuccess={deleteCategorySuccess}
      categoriesActions={categoriesActions}
      alertActions={alertActions}
      currentlyDeleting={currentlyDeleting}/>);
  }
});

function mapStateToProps(state) {
  return {
    isOnline: state.connection,
    categories: state.categories.categories,
    currentlyDeleting: state.categories.currentlyDeleting,
    deleteCategorySuccess: state.categories.deleteCategorySuccess,
    retrievingCategories: state.categories.retrievingCategories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    categoriesActions: bindActionCreators(categoriesActionCreators, dispatch),
    alertActions: bindActionCreators(alertActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
