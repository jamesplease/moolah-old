import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducer as form} from 'redux-form';
import auth from './auth/reducer';
import connection from './connection/reducer';
import categories from './categories/reducer';
import transactions from './transactions/reducer';
import alerts from './alerts/reducer';
import loadInitialData from '../common/utils/load-initial-data';

const initialData = loadInitialData();

const reducers = combineReducers({
  auth, form, transactions, categories,
  connection, alerts
});

export default createStore(
  reducers,
  initialData,
  applyMiddleware(thunk)
);
