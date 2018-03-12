import reducer from 'reducers/transaction/detail';
import * as types from 'actions/types';

describe('Transaction Detail reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      loading: false,
      data: {}
    }

    expect(reducer(undefined, {})).toEqual(initialState);
  });


});
