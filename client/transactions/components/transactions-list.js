import _ from 'lodash';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from '../../vendor/css-transition-group';
import TransactionListItem from './transaction-list-item';
import DeleteTransactionModal from './delete-transaction-modal';
import * as transactionsActionCreators from '../../state/transactions/action-creators';
import {getDayFromDate} from '../services/format-date';
import Modal from '../../common/components/modal';


export class TransactionsList extends Component {
  render() {
    const {transactions, updateTransaction} = this.props;

    const sortedTransactions = _.sortBy(
      transactions,
      t => -Number(getDayFromDate(t.attributes.date)),
      'amount'
    );

    const deleteModal = this.state.transactionToDelete ? this.getDeleteModal() : null;

    const transitionGroupProps = {
      transitionName: 'resourceListItem',
      transitionEnterTimeout: 250,
      transitionLeaveTimeout: 250,
      component: 'ul',
      className: 'resourceList'
    };

    return (
      <div className="resourceListContainer">
        {deleteModal}
        <ReactCSSTransitionGroup {...transitionGroupProps}>
          {sortedTransactions.map(t => (
            <TransactionListItem
              key={t.id}
              transaction={t}
              onClickDelete={this.onClickDelete}
              onClickEdit={updateTransaction}/>
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

  state = {
    transactionToDelete: null,
    transactionToUpdate: null
  }

  // We check to see if there was a successful delete by comparing props.
  // If there was, then we close the modal.
  componentWillReceiveProps(nextProps) {
    this.checkForSuccessfulDelete(nextProps);
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

  onClickDelete = (transaction) => {
    this.setState({
      transactionToDelete: transaction
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
}

function mapStateToProps(state) {
  return {
    isOnline: state.connection,
    transactionsMeta: state.transactions.transactionsMeta
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(transactionsActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList);
