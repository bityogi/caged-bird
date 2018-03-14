import reducer from 'reducers/admin/loading';
import * as types from 'actions/types';

describe('Admin loading reducer', () => {
  it('should return the initial state', () => {
    const initialState = 0;
    
    expect(reducer(undefined, {})).toEqual(initialState);
  });


});
