import { combineReducers } from 'redux';
import { chartReducer } from './chart';

export const rootReducer = combineReducers({
  chart: chartReducer
});