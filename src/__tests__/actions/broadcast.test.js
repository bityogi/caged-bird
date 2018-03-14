import { Thunk } from 'redux-testkit';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';

import { client } from 'util/axios';
import * as actions from 'actions';
import * as types from 'actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(client);

describe('Broadcast actions', () => {
  afterEach(() => {
    mock.reset()
  });

  it('creates the right actions for signedTransaction', async () => {
    const dispatches = await Thunk(actions.signedTransaction).execute();

    expect(dispatches.length).toBe(2);

  });

  it('creates the right actions for broadcastTransaction', async () => {
    const dispatches = await Thunk(actions.broadcastTransaction).execute();

    expect(dispatches.length).toBe(3);
  });
})
