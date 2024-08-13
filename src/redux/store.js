// src/redux/store.js
import { createStore, combineReducers } from 'redux';
import leaveReducer from './reducers/leaveReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  leave: leaveReducer,
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;
