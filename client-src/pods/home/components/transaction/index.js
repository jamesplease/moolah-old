import React from 'react';

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      description: props.description,
      value: props.value,
      date: props.date
    };

    this.deleteFn = props.deleteFn;
  }

  render() {
    return (
      <li className="transaction-row" key={this.state.id}>
        <div className="transaction-list-cell transaction-date-cell">
          {this.state.date}
        </div>
        <div className="transaction-list-cell transaction-name-cell">
          {this.state.description}
        </div>
        <div className="transaction-list-cell transaction-value-cell">
          {this.state.value}
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
  description: React.PropTypes.string,
  value: React.PropTypes.string,
  date: React.PropTypes.string,
  deleteFn: React.PropTypes.func
};

export default Transaction;
