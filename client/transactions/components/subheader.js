import _ from 'lodash';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Modal from '../../common/components/modal';
import ModifyTransactionModal from './modify-transaction-modal';
import * as transactionsActionsCreators from '../../state/transactions/action-creators';

export class TransactionsSubheader extends Component {
  render() {
    const {
      isOnline, transactions, creatingTransactionStatus
    } = this.props;
    const {isModalOpen} = this.state;
    const disabled = !isOnline;

    const childrenProps = {
      onClickCancel: this.onClickModalCancel,
      onSubmit: this.onClickModalCreate,
      confirmInProgress: creatingTransactionStatus === 'PENDING',
      actionFailure: creatingTransactionStatus === 'FAILURE',
      isEditMode: false,
      transactions
    };

    const modal = (
      <Modal modalClassName="modifyCategoryModal-container" isOpen={isModalOpen}>
        <ModifyTransactionModal {...childrenProps}/>
      </Modal>
    );

    return (
      <div className="subheader listHeader">
        {modal}
        <div className="container">
          <h1 className="subheader-title">
            Transactions
          </h1>
          <button
            className="subheader-action btn"
            onClick={this.onClickNew}
            disabled={disabled}>
            + Transaction
          </button>
        </div>
      </div>
    );
  }

  state = {
    isModalOpen: false
  }

  componentWillReceiveProps = (nextProps) => {
    // If we weren't previously trying to create a transaction,
    // then there's nothing for us to check.
    if (this.props.creatingTransactionStatus !== 'PENDING') {
      return;
    }

    // If the creation was successful, then we can close the
    // modal.
    if (nextProps.creatingTransactionStatus === 'SUCCESS') {
      this.setState({
        isModalOpen: false
      });
    }
  }

  onClickModalCreate = (fields) => {
    const {createTransaction} = this.props;

    const attributes = _.chain(fields)
      .defaults({
        description: '',
        label: '',
      })
      .omit('category')
      .value();

    let categoryRelationshipObject = null;
    if (fields.category) {
      categoryRelationshipObject = {
        type: 'categories',
        id: fields.category
      };
    }

    const categoryRelationship = {
      data: categoryRelationshipObject
    };

    const relationships = {category: categoryRelationship};

    attributes.description = attributes.description.trim();
    createTransaction({attributes, relationships});
  }

  onClickModalCancel = () => {
    this.setState({
      isModalOpen: false
    });
  }

  onClickNew = () => {
    this.setState({
      isModalOpen: true
    });
  }
}

function mapStateToProps(state) {
  return {
    isOnline: state.connection,
    transactions: state.transactions.resources,
    creatingTransactionStatus: state.transactions.creatingTransactionStatus
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(transactionsActionsCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsSubheader);
