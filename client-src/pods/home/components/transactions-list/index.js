import React from 'react';

import NewTransaction from '../new-transaction';
import Transaction from '../transaction';

class TransactionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  // Deletes an existing transaction
  deleteTransaction(id) {
    // Optimistically remove the item from the state
    this.setState({
      transactions: this.state.transactions.filter(t => t.id !== id)
    });
  }

  // Creates a new transaction
  createTransaction(newTransaction) {
    newTransaction = {
      id: 3,
      name: 'Test'
    };

    var clonedTransactions = this.state.transactions.slice();
    clonedTransactions.push(newTransaction);

    this.setState({
      transactions: clonedTransactions
    });
  }

  render() {
    return (
      <div>
        <NewTransaction createFn={this.createTransaction.bind(this)}/>
        <ul>
          {this.state.transactions.map(({id, description, value, date}) => (
            <Transaction key={id}
              id={id} description={description} value={value} date={date}
              deleteFn={this.deleteTransaction.bind(this)}/>
          ))}
        </ul>
      </div>
    );
  }
}

TransactionsList.propTypes = {
  transactions: React.PropTypes.array,
};

export default TransactionsList;
