import React from 'react';
import {connect} from 'react-redux';
import Header from '../header';
import Footer from '../footer';
import Alert from '../alert';
import MobileNav from '../mobile-nav';

export function Layout(props) {
  const {
    main,
    subheader,
    showAlert,
    alertStyle,
    alertText
  } = props;

  const alertProps = {
    visible: showAlert,
    style: alertStyle,
    text: alertText
  };

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

function mapStateToProps(state) {
  return {
    showAlert: state.ui.showAlert,
    alertStyle: state.ui.alertStyle,
    alertText: state.ui.alertText
  };
}

export default connect(mapStateToProps, null, null, {pure: false})(Layout);
