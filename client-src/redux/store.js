import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import connection from './connection/reducer';
import categories from './categories/reducer';
import transactions from './transactions/reducer';
import history from './history/reducer';
import ui from './ui/reducer';

const reducers = combineReducers({
  transactions, categories,
  connection, history, ui
});

export default createStore(
  reducers,
  applyMiddleware(thunk)
);
