import React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';

export function Alert({connection}) {
  const alertClass = classNames({
    alert: true,
    warning: true,
    visible: !connection
  });

  return (
    <div className={alertClass}>
      <i className="zmdi zmdi-alert-triangle alert-icon"></i>
      You seem to have lost connection.
    </div>
  );
}

function mapStateToProps(state) {
  return {
    connection: state.connection
  };
}

export default connect(mapStateToProps)(Alert);
