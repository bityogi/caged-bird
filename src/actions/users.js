
import { client } from 'util/axiosClient';

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './types';

import { history } from 'store';
import { showNotification } from './notification';

export const login = (credentials) => {
  console.log('login with credentials: ', credentials);

  return dispatch => {
    dispatch({
      type: LOGIN
    });

    return client.post(`/authenticate/cagebird`, credentials)
      .then(response => {
        console.log('resonse from authenticate: ', response);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            loading: false,
            token: response.data.token
          }
        });
        dispatch(showNotification('Users Logged In', 'info'));

        history.push('/landing');
      })
      .catch(error => {
        console.log('Error with authenticate: ', error);
        dispatch({
          type: LOGIN_FAILURE
        });
        dispatch(showNotification('Login Failed', 'warning'));

      });

  }
}

export const logout = () => {
  console.log('logging out');
  return dispatch => {
    dispatch({
        type: LOGOUT
    });

    dispatch(showNotification('Users Logged out', 'info'));

    history.push('/');
  }

}
