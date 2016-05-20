import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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
    if (this.props.retrievingCategories) {
      return <LoadingCategories/>;
    }

    if (!this.props.categories.length) {
      return <EmptyCategories/>;
    }

    return (<CategoriesList categories={this.props.categories}/>);
  }
});

function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
    retrievingCategories: state.categories.retrievingCategories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    categoriesActions: bindActionCreators(categoriesActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
