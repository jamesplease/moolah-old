import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import connection from './connection/reducer';
import transactions from './transactions/reducer';
import history from './history/reducer';
import ui from './ui/reducer';

const reducers = combineReducers({
  transactions, connection, history, ui
});

export default createStore(
  reducers,
  applyMiddleware(thunk)
);
