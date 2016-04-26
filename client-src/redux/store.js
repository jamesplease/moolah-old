import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import auth from './auth/reducer';
import history from './history/reducer';
import connection from './connection/reducer';
import transactions from './transactions/reducer';

const reducers = combineReducers({auth, transactions, connection, history});

export default createStore(
  reducers,
  applyMiddleware(thunk)
);
