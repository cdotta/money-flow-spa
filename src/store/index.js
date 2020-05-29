import { combineReducers, createStore } from 'redux';

import * as fromCurrentDate from './ducks/currentDate';

const reducers = combineReducers({
  currentDate: fromCurrentDate.reducer,
});

export default createStore(reducers);
