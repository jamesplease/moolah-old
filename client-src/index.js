import 'babel-polyfill';

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

const App = React.createClass({
  render() {
    return <div>It works</div>;
  }
});

render((
  <Router history={browserHistory}>
    <Route path="*" component={App}/>
  </Router>
), document.querySelector('.app-container'));
