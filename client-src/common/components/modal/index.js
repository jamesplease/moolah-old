import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import preventScroll from 'prevent-scroll';

const Modal = React.createClass({
  componentDidMount() {
    preventScroll.on();
  },

  componentWillUnmount() {
    preventScroll.off();
  },

  render() {
    const {
      children, alertHeight, modalClassName
    } = this.props;

    const modalClassProp = modalClassName || '';

    const modalClass = classNames({
      modal: true,
      [modalClassProp]: true
    });

    const modalStyle = {};
    if (alertHeight) {
      // `150` - the position of the modal as specified in the CSS. If the
      //         alertHeight exists, then that means we're not far enough down,
      //         so we add to it here.
      // `68` - the height of the alert as specified in the CSS. The difference
      //        is how much space is unaccounted for
      modalStyle.marginTop = 150 + (alertHeight - 68);
    }

    // This is one component where the base element's class name isn't the
    // name of the component. That's because we need the overlay
    return (
      <div className="modal-overlay">
        <div className={modalClass} style={modalStyle}>
          {children}
        </div>
      </div>
    );
  }
});

export {Modal};

function mapStateToProps(state) {
  return {
    alertHeight: state.ui.alertHeight
  };
}

export default connect(mapStateToProps)(Modal);
