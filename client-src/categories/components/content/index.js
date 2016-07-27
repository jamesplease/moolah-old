import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as categoriesActionCreators from '../../../redux/categories/action-creators';
import Subheader from '../subheader';
import CategoriesList from '../categories-list';
import EmptyCategories from '../empty-categories';
import ErrorRetrieving from '../../../common/components/error-retrieving';
import LoadingResourceList from '../../../common/components/loading-resource-list';

export const Categories = React.createClass({
  componentDidMount() {
    const {categoriesActions} = this.props;
    this.fetchingCategoriesXhr = categoriesActions.retrieveCategories();
  },

  componentWillUnmount() {
    const {categoriesActions} = this.props;
    if (this.fetchingCategoriesXhr) {
      this.fetchingCategoriesXhr.abort();
      categoriesActions.resetRetrieveCategoriesResolution();
    }
  },

  getContents() {
    const {
      retrievingCategoriesStatus, categories, categoriesActions
    } = this.props;

    if (retrievingCategoriesStatus === 'PENDING') {
      return <LoadingResourceList/>;
    }

    if (retrievingCategoriesStatus === 'FAILURE') {
      return (<ErrorRetrieving
        retry={categoriesActions.retrieveCategories}
        resourceName="Categories"/>);
    }

    if (!categories.length) {
      return <EmptyCategories/>;
    }

    return (<CategoriesList/>);
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
    categories: state.categories.categories,
    retrievingCategoriesStatus: state.categories.retrievingCategoriesStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    categoriesActions: bindActionCreators(categoriesActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
