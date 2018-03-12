import reducer from 'reducers/users';
import * as types from 'actions/types';

describe('Users reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      loading: false,
      data: {}
    }
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  
});
