import { combineReducers } from 'redux';
import { mainReducer } from './main';
import { playerReducer } from './player';

export const rootReducer = combineReducers({
  main: mainReducer,
  player: playerReducer
});