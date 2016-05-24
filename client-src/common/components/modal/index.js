import React from 'react';
import classNames from 'classnames';

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
    const modalClassProp = this.props.modalClassName || '';

    const modalClass = classNames({
      modal: true,
      [modalClassProp]: true
    })

    // This is one component where the base element's class name isn't the
    // name of the component. That's because we need the overlay
    return (
      <div className="modal-overlay">
        <div className={modalClass}>
          {this.props.children}
        </div>
      </div>
    );
  }
});
