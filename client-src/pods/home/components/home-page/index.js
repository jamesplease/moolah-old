import _ from 'lodash';
import React from 'react';

import TransactionsList from '../transactions-list';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
      transactions: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  // We set unmounted so that we can ignore data requests
  componentWillUnmount() {
    this.unmounted = true;
  }

  fetchData() {
    fetch('/api/v1/transactions')
      .then(
        res => res.json()
      )
      .then(json => {
        // Only set the state if the component is still mounted
        if (this.unmounted) { return; }

        // This code is temporary
        var transactions = _.map(json.data, t => {
          return {
            id: t.id,
            value: t.value ? t.value : '0.00',
            description: t.description ? t.description : 'Untitled',
            date: t.date ? t.date : '2015-02-04'
          };
        });
        this.setState({
          fetched: true,
          transactions
        });
      })
      .catch(() => console.error('There was an error while retrieving data.'));
  }

  render() {
    return (
      <div>
        {!this.state.fetched ? 'Loading...' : <TransactionsList transactions={this.state.transactions}/>}
      </div>
    );
  }
}

export default HomePage;
