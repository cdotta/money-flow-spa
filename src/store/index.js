import { combineReducers, createStore } from 'redux';

import * as fromCurrentDate from './ducks/currentDate';
import * as fromSelectedPayments from './ducks/selectedPayments';

const reducers = combineReducers({
  currentDate: fromCurrentDate.reducer,
  selectedPayments: fromSelectedPayments.reducer,
});

export default createStore(reducers);
