import { combineReducers } from 'redux';

import testReducer from './test';
import uiReducer from './ui';

export default combineReducers({
  testReducer,
  uiReducer,
});
