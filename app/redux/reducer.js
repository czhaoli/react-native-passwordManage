import { combineReducers } from 'redux';

import storageRed from './storage/storageRed';
const rootReducer = combineReducers({
  storageRed,
});

export default rootReducer;