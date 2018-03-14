import * as actions from 'actions';
import * as types from 'actions/types';


describe('Notification action', () => {
  it('creates SHOW_NOTIFICATION action', () => {
    const notification = 'Showing Notification';

    const expectedAction = {
      type: types.SHOW_NOTIFICATION,
      payload: {
        text: notification,
        type: 'info'
      }
    }

    expect(actions.showNotification(notification)).toEqual(expectedAction);
  });

  it('creates HIDE_NOTIFICATION action', () => {
    const expectedAction = {
      type: types.HIDE_NOTIFICATION
    }

    expect(actions.hideNotification()).toEqual(expectedAction);
  })
})
