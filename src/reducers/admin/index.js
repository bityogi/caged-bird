import { combineReducers } from 'redux';

import notification from './notification';
import loading from './loading';

export default combineReducers({
  notification,
  loading,
});
