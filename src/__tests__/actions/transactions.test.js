jest.mock('fs');
jest.mock('util/axiosClient');
jest.mock('util/usb');

import { Thunk } from 'redux-testkit';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';

import { client, authClient } from 'util/axiosClient';
import * as actions from 'actions';
import * as types from 'actions/types';
import * as status from 'util/transactionStatus';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(client);
const authClientMock = new MockAdapter(authClient());

describe('Transactions actions', () => {

  let store;

  const initialState = {
    transaction: {
      detail: {
        loading: false,
        data: {}
      },
      execution: {
        status: types.PENDING
      }
    }
  }

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

  beforeEach(() => {
    store = mockStore(initialState);
  });
  afterEach(() => {
    mock.reset();
  });

  // after(() => {
  //   mock.restore();
  // });

  it('creates the right actions for pendingTransactions', async () => {


    mock
      .onGet('/pendingTransactions/')
      .reply(200, data);

    const dispatches = await Thunk(actions.pendingTransactions).execute();

    expect(dispatches.length).toBe(3);

  });

  it('creates the right actions for transactionDetail', async () => {

    mock
      .onGet('/transactions/1')
      .reply(200, data);

    return store.dispatch(actions.transactionDetail(data[0]))
      .then(() => {
        const dispatches = store.getActions();
        expect(dispatches.length).toBe(4);
      });

  });

  it('creates the right actions for initializeTransaction', async () => {
    const dispatches = await Thunk(actions.initializeTransaction).execute();

    expect(dispatches.length).toBe(2);
  });

  describe('transactionExecute: ', () => {

    mock
      .onAny('transactions/1/unsigned')
      .reply(200, data);


    it('creates the right actions for transactionExecute onPatch fails', async () => {
      return store.dispatch(actions.transactionExecute(data[0]))
        .then(() => {
          const dispatches = store.getActions();
          expect(dispatches.length).toBe(4);
  
          expect(dispatches[0]).toMatchObject({ type: types.FETCH_START});
          expect(dispatches[1]).toMatchObject({ type: types.TRANSACTION_EXECUTION});
          expect(dispatches[2]).toMatchObject({ type: types.TRANSACTION_EXECUTION,
            payload: {
              status: status.CREATE_ERROR
            }
          });
          expect(dispatches[3]).toMatchObject({ type: types.FETCH_ERROR });
        });
  
    });
  });
  

  
})
