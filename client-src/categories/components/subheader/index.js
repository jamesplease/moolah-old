import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../../common/components/modal';
import CreateCategoryModal from '../create-category-modal';

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

  onClickModalCreate() {
    console.log('creating');
  },

  createModal() {
    const childrenProps = {
      onClickCancel: this.onClickModalCancel,
      onClickCreate: this.onClickModalCreate
    };

    const modalProps = {
      children: (<CreateCategoryModal {...childrenProps}/>),
      modalClassName: 'create-category-modal-container'
    };

    return (<Modal {...modalProps}/>);
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
    isOnline: state.connection
  };
}

export default connect(mapStateToProps)(CategoriesSubheader);
