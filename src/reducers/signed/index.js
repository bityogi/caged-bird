import { combineReducers } from 'redux';

import status from './status';
import broadcast from './broadcast';

export default combineReducers({
  broadcast,
  status,
});
