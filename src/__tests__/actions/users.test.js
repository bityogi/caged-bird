import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import { client } from 'util/axios';
import * as actions from 'actions';
import * as types from 'actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(client);


describe('User actions', () => {
  afterEach(() => {
    mock.reset()
    mock.restore()
  });

  it('creates LOGIN_SUCCESS after a successful login', () => {
    const data = {
      token: '1234'
    };
    mock
      .onPost('/authenticate/cagebird')
      .reply(200, data);

    const expectedActions = [
      { type: types.LOGIN },
      { type: types.LOGIN_SUCCESS, payload: { token: '1234' } },
      { type: types.SHOW_NOTIFICATION, payload: { text: 'Users Logged In', type: 'info' }}
    ];

    const store = mockStore({ users: {
        loading: false,
        data: {}
      }
    });

    const credentials = {
      username1: 'user1',
      password1: 'pass1',
      username2: 'user2',
      password2: 'pass2'
    };

    return store.dispatch(actions.login(credentials)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});
