import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { rootReducer } from './reducers';
import { compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

export const initStore = (initialState = {}) =>
createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunkMiddleware))
);