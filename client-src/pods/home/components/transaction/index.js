import React from 'react';

const Transaction = ({id, name}) => (
  <li className="transaction-row" key={id}>
    <span className="transaction-list-cell">
      03/01
    </span>
    <span className="transaction-list-cell">
      {name}
    </span>
    <span className="transaction-list-cell">
      $0.00
    </span>
    <span className="transaction-list-cell">
      <i className="zmdi zmdi-delete"></i>
    </span>
  </li>
);

Transaction.propTypes = {
  id: React.PropTypes.number,
  name: React.PropTypes.string,
};

export default Transaction;
