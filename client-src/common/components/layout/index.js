import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../header';
import Footer from '../footer';
import Alert from '../alert';
import MobileNav from '../mobile-nav';
import * as alertActionCreators from '../../../redux/alert/action-creators';
import * as connectionActionCreators from '../../../redux/connection/action-creators';

const Layout = React.createClass({
  componentDidMount() {
    const {
      alertActions,
      connectionActions
    } = this.props;

    window.addEventListener('offline', () => {
      connectionActions.userOffline();
      alertActions.queueAlert({
        style: 'warning',
        text: 'You are not connected to the internet',
        persistent: true,
        isDismissable: false
      });
    });

    window.addEventListener('online', () => {
      connectionActions.userOnline();
      alertActions.dismissCurrentAlert();
    });
  },

  render() {
    const {
      main,
      subheader,
      alertProps
    } = this.props;

    return (
      <div>
        <Header/>
        <MobileNav/>
        <Alert {...alertProps}/>
        <div className="content-container">
          {subheader}
          <main>
            {main}
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
    connectionActions: bindActionCreators(connectionActionCreators, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {pure: false}
)(Layout);
