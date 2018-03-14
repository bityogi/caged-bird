import {
  FETCH_ERROR
} from 'actions/types';
import { alert } from './alert';
import { showNotification } from './notification';

export const handleError = (error, isFetch = false) => {
  return dispatch => {
    if (error && error.status === 401) {
      //Unauthorized. Clear token. Send alert with redirect-to-home action
      const key = 'LOG_OUT' //TODO: import this from alertActions instead of hard-coding
      const message = 'Authorization token has expired. Please log in again.'
      dispatch(alert(key, message));
    } else {
      //Handle all other errors
      dispatch(showNotification('Error occured', 'warning'));
    }
    if (isFetch) {
      dispatch({
        type: FETCH_ERROR
      });
    }
  }

}
