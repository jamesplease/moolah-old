import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../header';
import Footer from '../footer';
import Alerts from '../alerts';
import * as connectionActionCreators from '../../../redux/connection/action-creators';

const Layout = React.createClass({
  // When the user goes offline, we update the connection status
  // and show an alert
  onOffline() {
    const {
      connectionActions
    } = this.props;

    connectionActions.userOffline();
  },

  // When the user comes back online, we update the connection
  // status and dismiss the alert
  onOnline() {
    const {connectionActions} = this.props;

    connectionActions.userOnline();
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
      user
    } = this.props;

    return (
      <div>
        <Header user={user}/>
        <Alerts/>
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
    user: state.auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
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
