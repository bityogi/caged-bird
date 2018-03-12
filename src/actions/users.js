
import { client } from 'util/axios';

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SHOW_NOTIFICATION
} from './types';

import { history } from 'store';

export const login = (credentials) => {
  console.log('login with credentials: ', credentials);

  return dispatch => {
    dispatch({
      type: LOGIN
    });

    client.post(`/authenticate/cagebird`, credentials)
      .then(response => {
        console.log('resonse from authenticate: ', response);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            token: response.data.token
          }
        });
        dispatch({
          type: SHOW_NOTIFICATION,
          payload: {
            text: 'Users Logged In',
            type: 'info',
          }
        })
        history.push('/landing');
      })
      .catch(error => {
        console.log('Error with authenticate: ', error);
        dispatch({
          type: LOGIN_FAILURE
        });
        dispatch({
          type: SHOW_NOTIFICATION,
          payload: {
            text: 'Login Failed',
            type: 'warning',
          }
        })
      });

  }
}

export const logout = () => {
  console.log('logging out');
  return dispatch => {
    dispatch({
        type: LOGOUT
    });

    dispatch({
      type: SHOW_NOTIFICATION,
      payload: {
        text: 'Users Logged out',
        type: 'info'
      }
    });

    history.push('/');
  }

}
