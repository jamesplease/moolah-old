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
      isOnline, transactions, creatingCategoryStatus
    } = this.props;
    const {isModalOpen} = this.state;
    const disabled = !isOnline;

    let modal;
    if (isModalOpen) {
      const childrenProps = {
        onClickCancel: this.onClickModalCancel,
        onSubmit: this.onClickModalCreate,
        confirmInProgress: creatingCategoryStatus === 'PENDING',
        actionFailure: creatingCategoryStatus === 'FAILURE',
        isEditMode: false,
        transactions
      };

      modal = (
        <Modal modalClassName="modifyCategoryModal-container">
          <ModifyTransactionModal {...childrenProps}/>
        </Modal>
      );
    }

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

    const attributes = _.defaults(fields, {
      description: '',
      label: '',
    });

    attributes.description = attributes.description.trim();
    createTransaction({attributes});
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
