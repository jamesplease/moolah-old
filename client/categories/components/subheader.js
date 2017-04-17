import _ from 'lodash';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Modal from '../../common/components/modal';
import ModifyCategoryModal from './modify-category-modal';
import * as categoriesActionCreators from '../../state/categories/action-creators';

export class CategoriesSubheader extends Component {
  render() {
    const {isOnline} = this.props;
    const modal = this.state.isModalOpen ? this.createModal() : null;

    return (
      <div className="subheader listHeader">
        {modal}
        <div className="container">
          <h1 className="subheader-title">
            Categories
          </h1>
          <button
            className="subheader-action btn"
            onClick={this.onClickNew}
            disabled={!isOnline}>
            + Category
          </button>
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
  }

  onClickNew = () => {
    this.setState({
      isModalOpen: true
    });
  }

  onClickModalCancel = () => {
    this.setState({
      isModalOpen: false
    });
  }

  onClickModalCreate = (fields) => {
    const attributes = _.defaults(fields, {
      emoji: null,
      label: ''
    });
    attributes.label = attributes.label.trim();
    this.props.createCategory({attributes});
  }

  createModal = () => {
    const childrenProps = {
      onClickCancel: this.onClickModalCancel,
      onSubmit: this.onClickModalCreate,
      categories: this.props.categories,
      confirmInProgress: this.props.creatingCategoryStatus === 'PENDING',
      actionFailure: this.props.creatingCategoryStatus === 'FAILURE',
      isEditMode: false
    };

    return (
      <Modal modalClassName="modifyCategoryModal-container">
        <ModifyCategoryModal {...childrenProps}/>
      </Modal>
    );
  }

  componentWillReceiveProps = (nextProps) => {
    // If we weren't previously trying to create a category,
    // then there's nothing for us to check.
    if (this.props.creatingCategoryStatus !== 'PENDING') {
      return;
    }

    // If the creation was successful, then we can close the
    // modal.
    if (nextProps.creatingCategoryStatus === 'SUCCESS') {
      this.setState({
        isModalOpen: false
      });
    }
  }
}

function mapStateToProps(state) {
  return {
    isOnline: state.connection,
    categories: state.categories.categories,
    creatingCategoryStatus: state.categories.creatingCategoryStatus
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createCategory: categoriesActionCreators.createCategory
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesSubheader);
