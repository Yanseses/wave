import { combineReducers } from 'redux';
import { playerReducer } from './player';
import { genresReducer } from './genres';
import { artistsReducer } from './artists';

export const rootReducer = combineReducers({
  genres: genresReducer,
  player: playerReducer,
  artists: artistsReducer
});