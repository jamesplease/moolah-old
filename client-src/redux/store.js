import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {reducer as form} from 'redux-form';
import connection from './connection/reducer';
import categories from './categories/reducer';
import transactions from './transactions/reducer';
import history from './history/reducer';
import alert from './alert/reducer';
import ui from './ui/reducer';

const reducers = combineReducers({
  form, transactions, categories,
  connection, history, ui,
  alert
});

export default createStore(
  reducers,
  applyMiddleware(thunk)
);
