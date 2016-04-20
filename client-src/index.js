import 'babel-polyfill';
import yo from 'yo-yo';

import Layout from './pods/common/components/layout';

const layout = Layout();

const appContainer = document.querySelector('.app-container');
appContainer.appendChild(layout);

fetch('/api/v1/transactions')
  .then(resp => resp.json())
  .then(resp => {
    yo.update(layout, Layout(resp.data));
  });
