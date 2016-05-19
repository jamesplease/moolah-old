import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';

import Layout from './common/components/layout';
import About from './meta/components/about';
import Contact from './meta/components/contact';
import Privacy from './meta/components/privacy';
import Terms from './meta/components/terms';
import store from './redux/store';

const App = React.createClass({
  render() {
    return <div>Not Found Sorry</div>;
  }
});

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <Route path="/contact" component={Contact}/>
        <Route path="/about" component={About}/>
        <Route path="/privacy" component={Privacy}/>
        <Route path="/terms" component={Terms}/>
        <Route path="*" component={App}/>
      </Route>
    </Router>
  </Provider>
), document.querySelector('.app-container'));
