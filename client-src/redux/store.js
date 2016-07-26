import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {reducer as form} from 'redux-form';
import auth from './auth/reducer';
import connection from './connection/reducer';
import categories from './categories/reducer';
import transactions from './transactions/reducer';
import contact from './contact/reducer';
import alerts from './alerts/reducer';

import initialData from '../common/services/initial-data';

const reducers = combineReducers({
  auth, form, transactions, categories,
  connection, alerts, contact
});

export default createStore(
  reducers,
  initialData,
  applyMiddleware(thunk)
);
