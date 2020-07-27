import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const initialState = {};

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
