import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../header';
import Footer from '../footer';
import Alert from '../alert';
import TransitionFirstChild from '../transition-first-child';
import * as alertActionCreators from '../../../redux/alert/action-creators';
import * as connectionActionCreators from '../../../redux/connection/action-creators';

const Layout = React.createClass({
  // When the user goes offline, we update the connection status
  // and show an alert
  onOffline() {
    const {
      alertActions,
      connectionActions
    } = this.props;

    connectionActions.userOffline();
    alertActions.queueAlert({
      style: 'warning',
      text: 'You are not connected to the internet',
      persistent: true,
      isDismissable: false
    });
  },

  // When the user comes back online, we update the connection
  // status and dismiss the alert
  onOnline() {
    const {
      alertActions,
      connectionActions
    } = this.props;

    connectionActions.userOnline();
    alertActions.dismissCurrentAlert();
  },

  componentDidMount() {
    // This handles the user being offline at the
    // time of the app launching
    if (!window.navigator.onLine) {
      this.onOffline();
    }

    window.addEventListener('offline', this.onOffline);
    window.addEventListener('online', this.onOnline);
  },

  render() {
    const {
      children,
      alertProps,
      alertActions,
      dispatch
    } = this.props;

    const allAlertProps = {
      dispatch,
      ...alertProps,
      ...alertActions
    };

    let alert;
    if (alertProps.alertIsActive) {
      alert = <Alert {...allAlertProps}/>;
    }

    const transitionGroupProps = {
      transitionName: 'alert',
      transitionAppear: true,
      transitionEnterTimeout: 250,
      transitionLeaveTimeout: 250,
      transitionAppearTimeout: 250,
      component: TransitionFirstChild
    };

    return (
      <div>
        <Header/>
        <ReactCSSTransitionGroup {...transitionGroupProps}>
          {alert}
        </ReactCSSTransitionGroup>
        <div className="content-container">
          <main>
            {children}
          </main>
          <Footer/>
        </div>
      </div>
    );
  }
});

export {Layout};

function mapStateToProps(state) {
  return {
    alertProps: state.alert
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators(alertActionCreators, dispatch),
    connectionActions: bindActionCreators(connectionActionCreators, dispatch),
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {pure: false}
)(Layout);
