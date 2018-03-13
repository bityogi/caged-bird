import { combineReducers } from 'redux';

import notification from './notification';
import loading from './loading';
import alert from './alert';

export default combineReducers({
  notification,
  loading,
  alert,
});
