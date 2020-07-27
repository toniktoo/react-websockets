import { combineReducers } from 'redux';

import { pointReducer } from './point';

export const rootReducer = combineReducers({ pointReducer });
