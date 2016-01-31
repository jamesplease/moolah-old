import React from 'react';

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name
    };

    this.deleteFn = props.deleteFn;
  }

  render() {
    return (
      <li className="transaction-row" key={this.state.id}>
        <div className="transaction-list-cell transaction-date-cell">
          03/01
        </div>
        <div className="transaction-list-cell transaction-name-cell">
          {this.state.name}
        </div>
        <div className="transaction-list-cell transaction-value-cell">
          $0.00
        </div>
        <div className="transaction-list-cell transaction-delete-cell">
          <i className="zmdi zmdi-delete delete-transaction" onClick={this.deleteFn.bind(this, this.state.id)}></i>
        </div>
      </li>
    );
  }
}

Transaction.propTypes = {
  id: React.PropTypes.number,
  name: React.PropTypes.string,
  deleteFn: React.PropTypes.func
};

export default Transaction;
