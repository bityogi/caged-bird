import { combineReducers } from 'redux';

import status from './status';
import broadcast from './broadcast';
import error from './error';

export default combineReducers({
  broadcast,
  status,
  error,
});
