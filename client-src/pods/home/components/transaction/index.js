import React from 'react';

const Transaction = ({id, name}) => (
  <li key={id}>{name}</li>
);

Transaction.propTypes = {
  id: React.PropTypes.number,
  name: React.PropTypes.string,
};

export default Transaction;
