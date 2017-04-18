import _ from 'lodash';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from '../../vendor/css-transition-group';
import TransactionListItem from './transaction-list-item';
import ModifyTransactionModal from './modify-transaction-modal';
import DeleteTransactionModal from './delete-transaction-modal';
import * as transactionsActionCreators from '../../state/transactions/action-creators';
import {getDayFromDate} from '../services/format-date';
import Modal from '../../common/components/modal';

export class TransactionsList extends Component {
  render() {
    const {transactions} = this.props;

    const sortedTransactions = _.sortBy(
      transactions,
      t => -Number(getDayFromDate(t.attributes.date)),
      'amount'
    );

    const deleteModal = this.state.transactionToDelete ? this.getDeleteModal() : null;
    const editModal = this.state.transactionToUpdate ? this.getEditModal() : null;

    const transitionGroupProps = {
      transitionName: 'resourceListItem',
      transitionEnterTimeout: 250,
      transitionLeaveTimeout: 250,
      component: 'ul',
      className: 'resourceList'
    };

    return (
      <div className="resourceListContainer">
        {editModal}
        {deleteModal}
        <ReactCSSTransitionGroup {...transitionGroupProps}>
          {sortedTransactions.map(t => (
            <TransactionListItem
              key={t.id}
              transaction={t}
              onClickDelete={this.onClickDelete}
              onClickEdit={this.onClickEdit}/>
          ))}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  getDeleteModal = () => {
    const {transactionsMeta} = this.props;

    const transactionId = this.state.transactionToDelete.id;
    const transactionBeingDeletedMeta = _.find(transactionsMeta, {id: transactionId});
    const isDeletingTransaction = transactionBeingDeletedMeta.isDeleting;

    const childrenProps = {
      onClickCancel: this.onClickModalCancel,
      onClickDelete: this.onConfirmDeleteModal,
      transaction: this.state.transactionToDelete,
      isDeletingTransaction
    };

    return (
      <Modal modalClassName="deleteTransactionModal-container">
        <DeleteTransactionModal {...childrenProps}/>
      </Modal>
    );
  }

  getEditModal = () => {
    const {transactionsMeta} = this.props;

    const transactionId = this.state.transactionToUpdate.id;
    const transactionBeingUpdatedMeta = _.find(transactionsMeta, {id: transactionId});
    const isUpdating = transactionBeingUpdatedMeta.updatingStatus === 'PENDING';

    const childrenProps = {
      categories: this.props.categories,
      onClickCancel: this.onClickModalCancel,
      onSubmit: this.onConfirmEditModal,
      transaction: this.state.transactionToUpdate,
      confirmInProgress: isUpdating,
      initialValues: this.state.transactionToUpdate,
      isEditMode: true
    };

    return (
      <Modal modalClassName="modifyTransactionModal-container">
        <ModifyTransactionModal {...childrenProps}/>
      </Modal>
    );
  }

  state = {
    transactionToDelete: null,
    transactionToUpdate: null
  }

  // We check to see if there was a successful delete by comparing props.
  // If there was, then we close the modal.
  componentWillReceiveProps(nextProps) {
    this.checkForSuccessfulDelete(nextProps);
    this.checkForSuccessfulUpdate(nextProps);
  }

  checkForSuccessfulDelete = (nextProps) => {
    // If the modal isn't open, then there's nothing to check
    if (!this.state.transactionToDelete) {
      return;
    }

    const {transactions} = nextProps;
    const {id} = this.state.transactionToDelete;

    // If the transaction no longer exists, then it has been deleted
    if (!_.find(transactions, {id})) {
      this.setState({
        transactionToDelete: null
      });
    }
  }

  checkForSuccessfulUpdate(nextProps) {
    // If the modal isn't open, then there's nothing to check
    if (!this.state.transactionToUpdate) {
      return;
    }

    const {transactionsMeta} = nextProps;
    const {id} = this.state.transactionToUpdate;
    const updatingTransactionMeta = _.find(transactionsMeta, {id});

    if (updatingTransactionMeta.updatingStatus === 'SUCCESS') {
      this.setState({
        transactionToUpdate: null
      });

      this.props.resetUpdateTransactionResolution({
        transactionId: id
      });
    }
  }

  onClickDelete = (transaction) => {
    this.setState({
      transactionToDelete: transaction
    });
  }

  onClickEdit = (transaction) => {
    this.setState({
      transactionToUpdate: transaction
    });
  }

  onClickModalCancel = () => {
    this.setState({
      transactionToDelete: null,
      transactionToUpdate: null
    });
  }

  onConfirmDeleteModal = () => {
    const {deleteTransaction} = this.props;
    const transaction = this.state.transactionToDelete;
    deleteTransaction(transaction.id);
  }

  onConfirmEditModal = (fields) => {
    const {updateTransaction} = this.props;
    const transactionId = this.state.transactionToUpdate.id;
    updateTransaction({
      id: transactionId,
      attributes: {...fields}
    });
  }
}

function mapStateToProps(state) {
  return {
    isOnline: state.connection,
    transactionsMeta: state.transactions.resourcesMeta
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(transactionsActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList);
