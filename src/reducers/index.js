import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
  ui: uiReducer,
});

export default rootReducer;
