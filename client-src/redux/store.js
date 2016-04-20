import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import transactions from './transactions/reducer';

const reducers = combineReducers({transactions});

export default createStore(
  reducers,
  applyMiddleware(thunk)
);
