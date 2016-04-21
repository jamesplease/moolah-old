import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import connection from './connection/reducer';
import transactions from './transactions/reducer';

const reducers = combineReducers({transactions, connection});

export default createStore(
  reducers,
  applyMiddleware(thunk)
);
