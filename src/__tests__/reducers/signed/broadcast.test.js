import reducer from 'reducers/signed/broadcast';
import * as types from 'actions/types';

describe('Signed-Transaction Broadcast reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      loading: false,
      data: {}
    }

    expect(reducer(undefined, {})).toEqual(initialState);
  });


});
