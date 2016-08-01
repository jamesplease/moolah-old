import React from 'react';
import ReactCSSTransitionGroup from '../../../vendor/css-transition-group';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Alert from '../alert';
import * as alertActionCreators from '../../../redux/alerts/action-creators';

const Alerts = React.createClass({
  getInitialState() {
    return {
      activeAlert: null
    };
  },

  componentWillReceiveProps(nextProps) {
    const {animatingAlertOut, alerts} = nextProps;

    if (animatingAlertOut || this.state.activeAlert) {
      return;
    }

    const firstAlert = alerts[0];
    if (firstAlert) {
      this.setState({
        activeAlert: firstAlert,
        alertIsVisible: true
      });
    }
  },

  animateOutAlert() {
    this.setState({
      activeAlert: null
    });
  },

  onTransitionOutAlert() {
    if (!this.props.alerts.length) {
      this.setState({
        alertIsVisible: false
      });
    }
  },

  render() {
    const {
      animatingAlertOut,
      alertActions, dispatch
    } = this.props;

    const {activeAlert, alertIsVisible} = this.state;

    let alert;
    if (activeAlert) {
      const alertProps = {
        ...activeAlert,
        ...alertActions,
        animatingAlertOut,
        onTransitionOutAlert: this.onTransitionOutAlert,
        animateOutAlert: this.animateOutAlert,
        dispatch
      };
      alert = <Alert {...alertProps}/>;
    }

    const alertsClass = classNames({
      alerts: true,
      alertVisible: alertIsVisible
    });

    const transitionGroupProps = {
      className: alertsClass,
      component: 'div',
      transitionName: 'alert',
      transitionAppear: true,
      transitionEnterTimeout: 250,
      transitionLeaveTimeout: 250,
      transitionAppearTimeout: 250
    };

    return (
      <ReactCSSTransitionGroup {...transitionGroupProps}>
        {alert}
      </ReactCSSTransitionGroup>
    );
  }
});

export {Alerts};

function mapStateToProps(state) {
  return {
    alerts: state.alerts.alerts,
    animatingAlertOut: state.alerts.animatingAlertOut,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators(alertActionCreators, dispatch),
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alerts);
