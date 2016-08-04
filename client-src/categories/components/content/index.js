import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as categoriesActionCreators from '../../../redux/categories/action-creators';
import Subheader from '../subheader';
import CategoriesList from '../categories-list';
import EmptyCategories from '../empty-categories';
import ErrorRetrieving from '../../../common/components/error-retrieving';
import LoadingResourceList from '../../../common/components/loading-resource-list';

export const Content = React.createClass({
  componentDidMount() {
    const {categoriesActions} = this.props;
    this.fetchingCategoriesXhr = categoriesActions.retrieveCategories();
  },

  componentWillUnmount() {
    if (this.fetchingCategoriesXhr) {
      this.fetchingCategoriesXhr.abort();
    }
  },

  render() {
    let contents;
    const {
      retrievingCategoriesStatus, categories, categoriesActions
    } = this.props;

    if (retrievingCategoriesStatus === 'PENDING') {
      contents = <LoadingResourceList/>;
    } else if (retrievingCategoriesStatus === 'FAILURE') {
      contents = (<ErrorRetrieving
        retry={categoriesActions.retrieveCategories}
        resourceName="Categories"/>);
    } else if (!categories.length) {
      contents = <EmptyCategories/>;
    } else {
      contents = <CategoriesList/>;
    }

    return (
      <div>
        <Subheader/>
        {contents}
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

export default connect(mapStateToProps, mapDispatchToProps)(Content);
