import React from 'react';
import classNames from 'classnames';
import preventScroll from 'prevent-scroll';

export default React.createClass({
  componentDidMount() {
    preventScroll.on();
  },

  componentWillUnmount() {
    preventScroll.off();
  },

  render() {
    const modalClassProp = this.props.modalClassName || '';

    const modalClass = classNames({
      modal: true,
      [modalClassProp]: true
    });

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
