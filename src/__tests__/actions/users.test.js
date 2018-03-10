import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from 'actions';
import * as types from 'actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('User actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  });

  it('creates LOGIN_SUCCESS after a successful login', () => {
    
  });

  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});
