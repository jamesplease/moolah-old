import React from 'react';
import ReactCSSTransitionGroup from '../../../vendor/css-transition-group';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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
        activeAlert: firstAlert
      });
    }
  },

  animateOutAlert() {
    this.setState({
      activeAlert: null
    });
  },

  render() {
    const {
      animatingAlertOut, destroyFirstAlert, dispatch
    } = this.props;

    const {activeAlert} = this.state;

    let alert;
    if (activeAlert) {
      const alertProps = {
        ...activeAlert,
        destroyFirstAlert,
        animatingAlertOut,
        animateOutAlert: this.animateOutAlert,
        dispatch
      };
      alert = <Alert {...alertProps}/>;
    }

    const transitionGroupProps = {
      className: 'alerts',
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
  return bindActionCreators({
    destroyFirstAlert: alertActionCreators.destroyFirstAlert
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alerts);
