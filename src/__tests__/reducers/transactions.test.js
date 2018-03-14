import reducer from 'reducers/transactions';
import * as types from 'actions/types';

describe('Transactions reducer', () => {
  it('should return the initial state', () => {
    const initialState = [];

    expect(reducer(undefined, {})).toEqual(initialState);
  });


});
