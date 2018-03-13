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
    const data = [{
      "transactionId":1,
      "clientAccount":"Digital Asset Custody Company",
      "amount":0.0010100000,
      "fee":null,
      "generatedOn":"2018-01-23T16:47:00",
      "memo":"DACC cold to CB hot 1",
      "coinDescription":"Ethereum",
      "ticker":"ETH",
      "amountField":"Transaction.Amount",
      "amountCalcMethodId":1,
      "amountCalcMethodDesc":"Amount + Ticker",
    }];
    
    mock
      .onGet('/pendingTransactions/')
      .reply(200, data);

    const dispatches = await Thunk(actions.pendingTransactions).execute();

    expect(dispatches.length).toBe(3);

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
