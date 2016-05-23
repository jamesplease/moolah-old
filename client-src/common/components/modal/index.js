import React from 'react';

export default React.createClass({
  disableMobileScroll(e) {
    e.preventDefault();
    e.stopPropagation();
  },

  componentDidMount() {
    document.body.classList.add('noscroll');
    document.body.addEventListener('touchmove', this.disableMobileScroll, false);
  },

  componentWillUnmount() {
    document.body.classList.remove('noscroll');
    document.body.removeEventListener('touchmove', this.disableMobileScroll);
  },

  render() {
    // This is one component where the base element's class name isn't the
    // name of the component. That's because we need the overlay
    return (
      <div className="modal-overlay">
        <div className="modal">
          {this.props.children}
        </div>
      </div>
    );
  }
});
