import reducer from 'reducers/admin/loading';
import * as types from 'actions/types';

describe('Admin alert reducer', () => {
  it('should return the initial state', () => {
    const initialState = 0;

    expect(reducer(undefined, {})).toEqual(initialState);
  });


});
