import React from 'react';

class NewTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.createFn = props.createFn;
  }

  render() {
    return (
      <div className="new-transaction">
        <div>
          Date
        </div>
        <div>
          Name
        </div>
        <div>
          Value
        </div>
        <button onClick={this.createFn}>
          + Create
        </button>
      </div>
    );
  }
}

NewTransaction.propTypes = {
  createFn: React.PropTypes.func
};

export default NewTransaction;
