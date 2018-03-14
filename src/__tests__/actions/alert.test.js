import * as actions from 'actions';
import * as types from 'actions/types';


describe('Alert action', () => {
  it('creates ALERT action', () => {
    const key = 'LOG_OUT';
    const message = 'Session is timed out';

    const expectedAction = {
      type: types.ALERT,
      payload: {
        key: key,
        message: message
      }
    }

    expect(actions.alert(key, message)).toEqual(expectedAction);
  });

  it('creates CLEAR_ALERT action', () => {
    const expectedAction = {
      type: types.CLEAR_ALERT
    }

    expect(actions.clearAlert()).toEqual(expectedAction);
  })
})
