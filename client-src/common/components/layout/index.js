import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../header';
import Footer from '../footer';
import Alert from '../alert';
import * as alertActionCreators from '../../../redux/alert/action-creators';
import * as connectionActionCreators from '../../../redux/connection/action-creators';
import * as uiActionCreators from '../../../redux/ui/action-creators';

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
      uiActions,
      dispatch,
      user,
      alertHeight
    } = this.props;

    const allAlertProps = {
      dispatch,
      alertHeight,
      ...alertProps,
      ...alertActions,
      ...uiActions
    };

    return (
      <div>
        <Header user={user}/>
        <Alert {...allAlertProps}/>
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
    alertProps: state.alert,
    user: state.auth.user,
    alertHeight: state.ui.alertHeight
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators(alertActionCreators, dispatch),
    connectionActions: bindActionCreators(connectionActionCreators, dispatch),
    uiActions: bindActionCreators(uiActionCreators, dispatch),
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {pure: false}
)(Layout);
