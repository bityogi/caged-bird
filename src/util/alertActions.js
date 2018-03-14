import store from 'store';
import { logout } from 'actions/users';

export const actions = {
  LOG_OUT : () => store.dispatch(logout())
}
