import _ from 'lodash';
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Modal from '../../../common/components/modal';
import CreateCategoryModal from '../create-category-modal';
import * as categoriesActionCreators from '../../../redux/categories/action-creators';

const CategoriesSubheader = React.createClass({
  getInitialState() {
    return {
      isModalOpen: false
    };
  },

  onClickNew() {
    this.setState({
      isModalOpen: true
    });
  },

  onClickModalCancel() {
    this.setState({
      isModalOpen: false
    });
  },

  onClickModalCreate(fields) {
    const newCategory = _.defaults(fields, {
      emoji: null,
      label: ''
    });
    this.props.categoriesActions.createCategory(newCategory);
    // console.log('creating', fields, this.props.categoriesActions.createCategory);
  },

  createModal() {
    const childrenProps = {
      onClickCancel: this.onClickModalCancel,
      onSubmit: this.onClickModalCreate,
      creatingCategory: this.props.creatingCategory
    };

    const modalProps = {
      children: (<CreateCategoryModal {...childrenProps}/>),
      modalClassName: 'create-category-modal-container'
    };

    return (<Modal {...modalProps}/>);
  },

  componentWillReceiveProps(nextProps) {
    // If we weren't previously trying to create a category,
    // then there's nothing for us to check.
    if (!this.props.creatingCategory) {
      return false;
    }


    // If the creation was successful, then we can close the
    // modal.
    if (nextProps.createCategorySuccess) {
      this.setState({
        isModalOpen: false
      });
    }
  },

  render() {
    const {isOnline} = this.props;

    const disabled = !isOnline;

    const modal = this.state.isModalOpen ? this.createModal() : null;

    return (
      <div className="sub-header">
        {modal}
        <div className="container">
          <h1 className="subheader-title">
            Categories
          </h1>
          <button
            className="subheader-action btn"
            onClick={this.onClickNew}
            disabled={disabled}>
            + Category
          </button>
        </div>
      </div>
    );
  }
});

export {CategoriesSubheader};

function mapStateToProps(state) {
  return {
    isOnline: state.connection,
    creatingCategory: state.categories.creatingCategory,
    createCategorySuccess: state.categories.createCategorySuccess,
    createCategoryFailure: state.categories.createCategoryFailure
  };
}

function mapDispatchToProps(dispatch) {
  return {
    categoriesActions: bindActionCreators(categoriesActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesSubheader);
