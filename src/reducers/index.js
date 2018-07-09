import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import usersReducer from './users';
import transactionsReducer from './transactions';
import transactionReducer from './transaction';
import adminReducer from './admin';
import signedReducer from './signed';
import walletsReducer from './wallet';

export default combineReducers({
  form: formReducer,
  routing: routerReducer,
  admin: adminReducer,
  users: usersReducer,
  transactions: transactionsReducer,
  transaction: transactionReducer,
  signed: signedReducer,
  wallet: walletsReducer
});
