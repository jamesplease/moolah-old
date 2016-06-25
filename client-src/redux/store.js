import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {reducer as form} from 'redux-form';
import connection from './connection/reducer';
import categories from './categories/reducer';
import transactions from './transactions/reducer';
import contact from './contact/reducer';
import alert from './alert/reducer';

const reducers = combineReducers({
  form, transactions, categories,
  connection, alert, contact
});

export default createStore(
  reducers,
  applyMiddleware(thunk)
);
