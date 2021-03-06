import React, {Component} from 'react';
import classNames from 'classnames';
import preventScroll from '../utils/prevent-scroll';
import ReactCSSTransitionGroup from '../../vendor/css-transition-group';

export default class Modal extends Component {
  render() {
    const {modalClassName, isOpen} = this.props;
    const modalClassProp = modalClassName || '';

    const modalClass = classNames({
      modal: true,
      [modalClassProp]: true
    });

    // This is one component where the base element's class name isn't the
    // name of the component. That's because we need the overlay
    return (
      <ReactCSSTransitionGroup
        transitionName="modalTransition"
        transitionAppear={true}
        transitionAppearTimeout={100}
        transitionEnterTimeout={100}
        transitionLeaveTimeout={70}>
        {isOpen && (
          <div className="modal-overlay">
            <div className={modalClass}>
              {this.props.children}
            </div>
          </div>
        )}
      </ReactCSSTransitionGroup>
    );
  }

  componentWillReceiveProps(nextProps) {
    const {isOpen} = this.props;
    if (nextProps.isOpen && !isOpen) {
      preventScroll.on();
    } else if (!nextProps.isOpen && isOpen) {
      preventScroll.off();
    }
  }
}
