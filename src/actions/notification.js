import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION
} from 'actions/types';

export const showNotification = (text, type = 'info') => ({
  type: SHOW_NOTIFICATION,
  payload: { text, type },
});

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION,
});
