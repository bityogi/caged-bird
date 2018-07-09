import { combineReducers } from 'redux';

import seed from './seed';
import wallets from './wallets';

export default combineReducers({
    seed,
    wallets
});
