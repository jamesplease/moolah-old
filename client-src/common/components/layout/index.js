import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../header';
import Footer from '../footer';
import Alerts from '../alerts';
import * as connectionActionCreators from '../../../redux/connection/action-creators';

export class Layout extends Component {
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

  componentDidMount = () => {
    // This handles the user being offline at the
    // time of the apxp launching
    if (!window.navigator.onLine) {
      this.props.userOffline();
    }

    window.addEventListener('offline', this.props.userOffline);
    window.addEventListener('online', this.props.userOnline);
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    userOffline: connectionActionCreators.userOffline,
    userOnline: connectionActionCreators.userOnline,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {pure: false}
)(Layout);
