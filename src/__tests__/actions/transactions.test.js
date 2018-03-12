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

describe('Transactions actions', () => {
  afterEach(() => {
    mock.reset()
  });

  it('creates the right actions for pendingTransactions', async () => {
    const dispatches = await Thunk(actions.pendingTransactions).execute();

    expect(dispatches.length).toBe(2);

  });

  it('creates the right actions for transactionDetail', async () => {
    const dispatches = await Thunk(actions.transactionDetail).execute();

    expect(dispatches.length).toBe(2);
  });

  it('creates the right actions for transactionExecute', async () => {
    const dispatches = await Thunk(actions.transactionExecute).execute();

    expect(dispatches.length).toBe(2);
  });

  it('creates the right actions for initializeTransaction', async () => {
    const dispatches = await Thunk(actions.initializeTransaction).execute();

    expect(dispatches.length).toBe(2);
  });
})
