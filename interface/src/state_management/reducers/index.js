import { combineReducers } from 'redux';

import testReducer from './test';
import uiReducer from './ui';
import adminReducer from './admin';

export default combineReducers({
  testReducer,
  uiReducer,
  adminReducer,
});
