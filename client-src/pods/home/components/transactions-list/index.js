import React from 'react';

import Transaction from '../transaction';

class TransactionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  deleteTransaction(id) {
    // Optimistically remove the item from the state
    this.setState({
      transactions: this.state.transactions.filter(t => t.id !== id)
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.transactions.map(({id, name}) => (
            <Transaction key={id} id={id} name={name} deleteFn={this.deleteTransaction.bind(this)}/>
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
