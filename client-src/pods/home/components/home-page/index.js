import React from 'react';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
      transactions: []
    };
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.fetchData();
    }, 1000);
  }

  // We set unmounted so that we can ignore data requests
  componentWillUnmount () {
    this.unmounted = true;
  }

  fetchData() {
    fetch('/tests')
      .then(
        res => res.json()
      )
      .then(json => {
        // Only set the state if the component is still mounted
        if (this.unmounted) { return; }
        this.setState({
          fetched: true,
          transactions: json.data
        });
      })
      .catch(() => console.error('There was an error while retrieving data.'));
  }

  render() {
    return (
      <div>
        {!this.state.fetched ? 'Loading...' : `Fetched ${this.state.transactions.length} items!`}
      </div>
    );
  }
}

export default HomePage;
