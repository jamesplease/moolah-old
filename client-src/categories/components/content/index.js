import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as categoriesActionCreators from '../../../redux/categories/action-creators';
import * as alertActionCreators from '../../../redux/alert/action-creators';
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
      categoriesActions, alertActions,
      currentlyDeleting, isOnline
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
      alertActions={alertActions}
      categoriesActions={categoriesActions}
      currentlyDeleting={currentlyDeleting}/>);
  }
});

function mapStateToProps(state) {
  return {
    isOnline: state.connection,
    categories: state.categories.categories,
    currentlyDeleting: state.categories.currentlyDeleting,
    retrievingCategories: state.categories.retrievingCategories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators(alertActionCreators, dispatch),
    categoriesActions: bindActionCreators(categoriesActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
