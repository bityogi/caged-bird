import {
  ALERT,
  CLEAR_ALERT
} from 'actions/types';

export const alert = (key, message) => {
  console.log('sending alerty with key %s and message %s', key, message);
  return {
    type: ALERT,
    payload: {
      key,
      message
    }
  }
}

export const clearAlert = () => {
  console.log('clearing alert');
  return {
    type: CLEAR_ALERT
  }
}
