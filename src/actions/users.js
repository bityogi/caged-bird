import axios from 'axios';

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

    return setTimeout(() => {
      // temporary code
      const validUsers = ['user1', 'user2']
      if (!validUsers.includes(credentials.username1)) {
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
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            token: '1234'
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
      }

    }, 3000)
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
