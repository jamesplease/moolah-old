import React from 'react';

import Transaction from '../transaction';

const TransactionsList = ({transactions}) => (
  <div>
    <ul>
      {transactions.map(({id, name}) => (
        <Transaction key={id} id={id} name={name}/>
      ))}
    </ul>
  </div>
);

TransactionsList.propTypes = {
  transactions: React.PropTypes.array,
};

export default TransactionsList;
