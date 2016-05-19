import 'babel-polyfill';

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import About from './meta/components/about';
import Contact from './meta/components/contact';
import Privacy from './meta/components/privacy';
import Terms from './meta/components/terms';

const App = React.createClass({
  render() {
    return <div>Not Found Sorry</div>;
  }
});

render((
  <Router history={browserHistory}>
    <Route path="/contact" component={Contact}/>
    <Route path="/about" component={About}/>
    <Route path="/privacy" component={Privacy}/>
    <Route path="/terms" component={Terms}/>
    <Route path="*" component={App}/>
  </Router>
), document.querySelector('.app-container'));
