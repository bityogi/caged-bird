import { combineReducers } from 'redux';

import detail from './detail';
import execution from './execution';

export default combineReducers({
  detail,
  execution,
});
