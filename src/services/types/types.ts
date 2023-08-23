import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../../index';
import { TPlayerActions } from '../actions/player';
import { TGenresActions } from '../actions/genres';
import { TTopArtists } from '../actions/artists';

export type TApplicationActions = TGenresActions | TPlayerActions | TTopArtists;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;