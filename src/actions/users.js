import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './types';

import { history } from 'store';

export const login = (credentials) => {
  console.log('login with credentials: ', credentials);

  return dispatch => {
    dispatch({
      type: LOGIN
    })

    return setTimeout(() => {
      dispatch({
        type: LOGIN_SUCCESS
      })
      history.push('/landing');

    }, 3000)
  }
}

export const logout = () => {
  console.log('logging out');
  return {
    type: LOGOUT
  }
}
