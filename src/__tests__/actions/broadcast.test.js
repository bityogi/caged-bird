jest.mock('util/axios');

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

jest.mock('util/usb');

describe('Broadcast actions', () => {
  const MOCK_DRIVES =
    [
      {
      "device": "/dev/sda",
      "displayName": "/dev/sda",
      "description": "Ultra Fit",
      "size": 15376000000,
      "mountpoints": [{
        "path": "/media/root/DISK"
      }],
      "raw": "/dev/sda",
      "protected": false,
      "system": false
    }, {
      "device": "/dev/mmcblk0",
      "displayName": "/dev/mmcblk0",
      "description": "SL16G",
      "size": 15931539456,
      "mountpoints": [{
        "path": "/"
      }, {
        "path": "/media/boot"
      }],
      "raw": "/dev/mmcblk0",
      "protected": false,
      "system": false
    }
  ]

  const initialState = {
    signed: {
      broadcast: {
        loading: false,
        data: {}
      },
      status: null
    }
  }

  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    require('drivelist').__setMockDrives(MOCK_DRIVES);
  });

  afterEach(() => {
    mock.reset()
  });

  it('creates the right actions for signedTransaction', () => {
    return store.dispatch(actions.signedTransaction())
      .then(() => {
        const dispatches = store.getActions();
        expect(dispatches.length).toBe(5);
      })

  });

  it('creates the right actions for broadcastTransaction', () => {
    return store.dispatch(actions.broadcastTransaction())
      .then(() => {
        const dispatches = store.getActions();
        expect(dispatches.length).toBe(5);
      })

  });
})
