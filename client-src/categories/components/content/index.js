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
    if (this.fetchingCategoriesXhr) {
      this.fetchingCategoriesXhr.abort();
    }
  },

  getContents() {
    const {
      retrievingCategories, categories,
      retrieveCategoriesFailure,
      categoriesActions
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
    retrievingCategories: state.categories.retrievingCategories,
    retrieveCategoriesFailure: state.categories.retrieveCategoriesFailure
  };
}

function mapDispatchToProps(dispatch) {
  return {
    categoriesActions: bindActionCreators(categoriesActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
