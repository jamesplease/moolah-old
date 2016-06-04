import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as alertActionCreators from '../../../redux/alert/action-creators';
import * as categoriesActionCreators from '../../../redux/categories/action-creators';
import TransactionListItem from '../transaction';

const TransactionsList = React.createClass({
  getInitialState() {
    return {
      isDeleteModalOpen: false,
      transactionToDelete: null,
      isUpdateModalOpen: false,
      transactionToUpdate: null
    };
  },

  render() {
    const {
      transactions, isOnline
    } = this.props;

    const deleteModal = this.state.isDeleteModalOpen ? this.getDeleteModal() : null;
    const editModal = this.state.isUpdateModalOpen ? this.getEditModal() : null;

    const sortedTransactions = _.sortBy(transactions, t => {
      const date = new Date(t.date);
      return date.getTime();
    });

    const transitionGroupProps = {
      transitionName: 'resource-list-item',
      transitionEnterTimeout: 250,
      transitionLeaveTimeout: 250
    };

    return (
      <div className="transactions-list resource-list-container">
        {editModal}
        {deleteModal}
        <div className="resource-list">
          <ReactCSSTransitionGroup {...transitionGroupProps}>
            {transactions.map(transaction => (
              <TransactionListItem
                key={transaction.id}/>
            ))}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
});

export {TransactionsList};

function mapStateToProps(state) {
  return {
    isOnline: state.connection,
    transactions: state.transactions.transactions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    categoriesActions: bindActionCreators(categoriesActionCreators, dispatch),
    alertActions: bindActionCreators(alertActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList);
