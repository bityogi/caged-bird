import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { Thunk } from 'redux-testkit';

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

  const store = mockStore({ users: {
      loading: false,
      data: {}
    }
  });

  it('creates LOGIN, LOGIN_SUCCESS, SHOW_NOTIFICATION after a successful login', async () => {
    const data = {
      token: '1234'
    };
    mock
      .onPost('/authenticate/cagebird')
      .reply(200, data);


    const credentials = {
      username1: 'user1',
      password1: 'pass1',
      username2: 'user2',
      password2: 'pass2'
    };

    const dispatches = await Thunk(actions.login).execute();

    expect(dispatches.length).toBe(3);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({ type: types.LOGIN });

    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[1].getAction()).toEqual({ type: types.LOGIN_SUCCESS, payload: { token: '1234' } });

    expect(dispatches[2].isPlainObject()).toBe(true);
    expect(dispatches[2].getAction()).toEqual({ type: types.SHOW_NOTIFICATION, payload: { text: 'Users Logged In', type: 'info' }});


  });

  it('creates LOGOUT, SHOW_NOTIFICATION after a successful logout', async () => {
    const expectedActions = [
      { type: types.LOGOUT },
      { type: types.SHOW_NOTIFICATION, payload: { text: 'Users Logged out', type: 'info' }}
    ];

    const dispatches = await Thunk(actions.logout).execute();

    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({ type: types.LOGOUT });

    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[1].getAction()).toEqual({ type: types.SHOW_NOTIFICATION, payload: { text: 'Users Logged out', type: 'info' }});


  });
});
