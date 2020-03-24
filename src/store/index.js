import { combineReducers, createStore } from 'redux';

function currentDate(state = new Date().toISOString()) {
  return state;
}

const reducers = combineReducers({ currentDate });

export default createStore(reducers);
