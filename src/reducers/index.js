import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import usersReducer from './users';
import transactionsReducer from './transactions';

export default combineReducers({
  form: formReducer,
  routing: routerReducer,
  users: usersReducer,
  transactions: transactionsReducer
});
