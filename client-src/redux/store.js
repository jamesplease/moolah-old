import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import connection from './connection/reducer';
import transactions from './transactions/reducer';
import history from './history/reducer';

const reducers = combineReducers({transactions, connection, history});

export default createStore(
  reducers,
  applyMiddleware(thunk)
);
