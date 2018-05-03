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
    } else if (isObject(error)) {
      const errorInfo = (error.data) ? error.data : 'Error occured';
      if (isObject(errorInfo)) {
        dispatch(showNotification('Unknown exception', 'warning'));
      } else {
        dispatch(showNotification(errorInfo, 'warning'));
      }

    } else {
      //Handle all other errors
      const errorInfo = (error) ? error : 'Error Occured';
      dispatch(showNotification(errorInfo, 'warning'));
    }
    if (isFetch) {
      dispatch({
        type: FETCH_ERROR
      });
    }
  }

}

function isObject(obj) {
  return obj === Object(obj);
}
